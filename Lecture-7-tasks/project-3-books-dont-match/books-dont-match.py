import pandas as pd

# Create the data
data = [
    {"Date": "2025-09-02", "From": "Ali", "Amount": 1000, "Memo": "trip me + my brother Omar"},
    {"Date": "2025-09-02", "From": "Sara", "Amount": 500, "Memo": "trip dues"},
    {"Date": "2025-09-03", "From": "Bilal", "Amount": 500, "Memo": ""},
    {"Date": "2025-09-03", "From": "Hina", "Amount": 500, "Memo": "class trip"},
    {"Date": "2025-09-05", "From": "0300-unknown", "Amount": 500, "Memo": ""},
    {"Date": "2025-09-05", "From": "Usman", "Amount": 300, "Memo": "pizza"},
    {"Date": "2025-09-06", "From": "Zoya", "Amount": 500, "Memo": "dues"},
    {"Date": "2025-09-08", "From": "Ayesha", "Amount": 500, "Memo": "trip"}
]
df = pd.DataFrame(data)

# Define variables
students = ["Ali", "Omar", "Sara", "Bilal", "Hina", "Zoya", "Ayesha", "Usman"]
payments_tracker = {s: 0 for s in students}
unmatched_payments = []
ignored_payments = []

# Process records
for index, row in df.iterrows():
    name = row['From']
    amount = row['Amount']
    memo = str(row['Memo'])

    # Rule: Usman's pizza is ignored
    if name == "Usman" and "pizza" in memo:
        ignored_payments.append(row.to_dict())
        continue

    # Rule: Unknown payment
    if name == "0300-unknown":
        unmatched_payments.append(row.to_dict())
        continue

    # Rule: Ali pays for himself and Omar
    if name == "Ali":
        payments_tracker["Ali"] += 500
        payments_tracker["Omar"] += 500
    elif name in payments_tracker:
        payments_tracker[name] += amount
    else:
        # If someone else paid not in our list
        unmatched_payments.append(row.to_dict())

# Determine status
paid = [s for s, amt in payments_tracker.items() if amt >= 500]
unpaid = [s for s, amt in payments_tracker.items() if amt < 500]

# Calculate stats
total_target = 4000
total_collected_dues = len(paid) * 500 # Valid payments applied to dues

print("Status Tracker:")
print(payments_tracker)
print("\nPaid:", paid)
print("Unpaid:", unpaid)
print("\nUnmatched Payments:")
for p in unmatched_payments:
    print(p)
print("\nIgnored Payments:")
for p in ignored_payments:
    print(p)
print(f"\nTotal collected towards dues: {total_collected_dues}")