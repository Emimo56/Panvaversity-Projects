---
name: java-postman-request
description: Builds a complete Postman request (headers, path/query variables, resolved URL, and JSON body) from a Java endpoint signature and its POJO/DTO class. Use this skill whenever the user pastes a Java REST endpoint (Spring/JAX-RS controller method, @RequestMapping/@GetMapping/@PostMapping/@Path annotation, or a plain "METHOD /some/url" line) together with a POJO/DTO/record class, or asks to "create a Postman request" from Java code. Also trigger if the user says things like "make a request for this endpoint", "generate the JSON body for this class", or pastes a Java class right after discussing an API endpoint. Creates the request directly in the user's connected Postman workspace via the Postman MCP tools when available; otherwise outputs the equivalent request as structured text/JSON.
---

# Java Endpoint → Postman Request

Turn a Java endpoint (Spring Boot / JAX-RS / plain description) plus its POJO/DTO into a ready-to-use Postman request: method, resolved URL, path variables, query params, headers, and a realistic JSON body.

## Workflow

1. **Gather inputs.** You need:
   - HTTP method + URL path (from `@GetMapping("/api/users/{id}")`, `@RequestMapping(method = ..., path = ...)`, `@Path`, or plain text like `POST /api/orders`).
   - The POJO/DTO/record used as `@RequestBody` (or the return type, if only a response example is wanted).
   - Base URL / environment variable to prefix the path with.
   - Target collection/workspace in Postman.

   If the endpoint or POJO is missing, ask for it — don't guess field names. If only the base URL/collection is missing, default sensibly (see "Defaults" below) and mention the assumption instead of blocking.

2. **Parse path & query variables from the method signature/annotation:**
   - `{id}`, `{orderId}`, etc. in the path → Postman path variables `:id`, `:orderId` (or keep `{{id}}` style if the user's shop prefers that — default to Postman's native `:var` syntax with values filled from context or placeholder values).
   - Parameters annotated `@PathVariable` → path variable.
   - Parameters annotated `@RequestParam` → query parameter. Note whether `required = false` / has a `defaultValue` — mark optional params as disabled-by-default or annotate them as optional.
   - Parameters annotated `@RequestHeader` → header, not query param.

3. **Generate the JSON body from the POJO.** Walk every field (including inherited fields and record components) and produce a plausible sample value using the type-mapping table below. Never leave a field as `null` or `""` unless the field's Java type is a boxed wrapper explicitly nullable by convention (e.g., an `Optional<T>` or a field named `*Id` intended for update-only calls) — the point is a body a developer can actually send and get a 2xx back.
   - Respect Jackson annotations if present: `@JsonProperty("custom_name")` overrides the JSON key; `@JsonIgnore` / `transient` fields are excluded; `@JsonInclude(NON_NULL)` doesn't change generation, just means nulls would be dropped.
   - For `GET`/`DELETE` with no `@RequestBody`, don't invent a body — only build path/query params and headers.
   - For nested POJOs, recurse. For collections (`List<T>`, `Set<T>`), emit an array with 1–2 sample elements. For `Map<K,V>`, emit one sample key/value pair.

4. **Determine headers:**
   - `Content-Type: application/json` whenever there's a JSON body (POST/PUT/PATCH with `@RequestBody`).
   - `Accept: application/json` by default.
   - If the class/package/imports suggest auth (e.g., a `@PreAuthorize`, Spring Security context, or the user mentions auth), add `Authorization: Bearer {{token}}` as a templated header rather than a fake token.
   - Any `@RequestHeader`-annotated parameters, using their declared name and a sample or placeholder value.

5. **Build the full URL** by joining the base URL (see Defaults) with the path, substituting or templating path variables, and appending query params.

6. **Create the request.** If Postman MCP tools are connected (search for them — `Postman:createCollection`, `Postman:createCollectionRequest`, etc.), use them to actually create the request in the target collection so it's usable immediately:
   - Reuse an existing collection if the user has one for this project; otherwise create one (ask once per conversation which collection to use, then remember the answer for the rest of the session).
   - Use `{{baseUrl}}` as a collection/environment variable rather than hardcoding a host, unless the user gave a concrete URL.
   - Name the request `METHOD /path` (e.g., `POST /api/orders`) so it's identifiable in the sidebar.
   - Put the generated JSON in the request body as `raw`/`json` mode.
   - After creating it, tell the user what was created and where (collection name), and show the resolved URL — don't dump the full Postman API payload back at them.
   - If Postman tools are unavailable or the user just wants a preview, present the same information as a clearly formatted block: method, URL, headers, path/query vars, and JSON body — see Output Format below.

## Defaults (use and state, don't block on)

- Base URL: `{{baseUrl}}` collection variable, unless the user already gave a concrete host.
- Collection: ask once; if the user has no preference, create one named after the Java package or controller class (e.g., `OrderController`).
- Path variable syntax: Postman native `:paramName` in the URL, with the "Path Variables" section populated with a realistic sample value.
- Unspecified numeric IDs: use small positive integers (`1`, `101`) rather than `0` or random UUID-looking junk, unless the field type is actually `UUID`.

## Java type → sample JSON value mapping

| Java type | Sample JSON value |
|---|---|
| `String` | Short realistic string based on the field name (e.g., `email` → `"jane.doe@example.com"`) |
| `int`, `Integer`, `short`, `Short` | Small positive integer, e.g. `1` |
| `long`, `Long` | Larger integer or ID-looking number, e.g. `1001` |
| `double`, `Double`, `float`, `Float` | Decimal number, e.g. `19.99` |
| `BigDecimal` | Decimal number as JSON number (or string if the field name suggests currency and the API is known to use string money) |
| `boolean`, `Boolean` | `true` (pick the more common/realistic default for the field name, e.g. `isActive` → `true`) |
| `LocalDate` | `"2026-07-18"` (ISO date) |
| `LocalDateTime` / `Instant` / `ZonedDateTime` | `"2026-07-18T10:30:00Z"` (ISO 8601) |
| `UUID` | A well-formed sample UUID string |
| `enum` | One of the actual declared enum constants (ask/inspect if not given, otherwise use the first constant) |
| `List<T>` / `Set<T>` | Array with 1–2 recursively generated `T` samples |
| `Map<K,V>` | Object with one sample key/value pair |
| Nested POJO/record | Recurse using this same table |
| `Optional<T>` | Populate with a sample `T` (Optional unwraps in JSON either way) |

## Output format (when not creating directly in Postman)

Present as a compact block, not prose paragraphs:

```
POST {{baseUrl}}/api/orders/:orderId/items

Path Variables:
  orderId = 1001

Query Params:
  (none)

Headers:
  Content-Type: application/json
  Accept: application/json

Body (raw JSON):
{
  "productId": 1,
  "quantity": 2,
  "notes": "Leave at front door"
}
```

## Notes

- If the user pastes a full controller class with multiple endpoint methods, ask which method(s) to build requests for, or build all of them if they say "all"/"the whole controller" — in that case, group them under one collection folder named after the controller.
- If a POJO field type isn't resolvable (a custom type not shown), ask for that class or fall back to a generic placeholder object `{}` and flag it rather than guessing wildly.
- Always keep generated sample data obviously fake/safe (no real emails, names, or tokens beyond conventional test-looking values like `example.com`).
