from pathlib import Path
import pandas as pd
from openpyxl import Workbook

# -----------------------------
# Read the transaction file
# -----------------------------
file_path = "sample-transactions.txt"

df = pd.read_csv(file_path)

# Convert columns to proper types
df["Date"] = pd.to_datetime(df["Date"])
df["Amount"] = df["Amount"].astype(float)

# -----------------------------
# Find recurring monthly charges
# -----------------------------
negative_transactions = df[df["Amount"] < 0]

recurring = (
    negative_transactions
    .groupby("What")
    .agg(
        months=("Date", lambda x: x.dt.to_period("M").nunique()),
        count=("What", "count"),
        total=("Amount", "sum")
    )
)

# Keep only charges that appeared in at least 3 months
recurring = recurring[recurring["months"] >= 3]

# -----------------------------
# Find duplicate charges
# Same Date + Same Description + Same Amount
# -----------------------------
duplicates = (
    negative_transactions
    .groupby(["Date", "What", "Amount"])
    .size()
    .reset_index(name="Occurrences")
)

duplicates = duplicates[duplicates["Occurrences"] > 1]

# -----------------------------
# Calculate current balance
# -----------------------------
current_balance = df["Amount"].sum()

# -----------------------------
# Estimate balance before next pocket money
# -----------------------------
last_pocket_money = df[df["What"] == "Pocket money"]["Date"].max()

next_pocket_money = last_pocket_money + pd.offsets.MonthBegin(1)

remaining_expenses = negative_transactions[
    (negative_transactions["Date"] > last_pocket_money) &
    (negative_transactions["Date"] < next_pocket_money)
]["Amount"].sum()

estimated_balance = current_balance + remaining_expenses

# -----------------------------
# Display results
# -----------------------------
print("=" * 50)
print("Recurring Monthly Charges")
print("=" * 50)
print(recurring)

print("\n")

print("=" * 50)
print("Possible Duplicate Charges")
print("=" * 50)
print(duplicates)

print("\n")

print(f"Current Balance: {current_balance:.2f}")
print(f"Estimated Balance Before Next Pocket Money: {estimated_balance:.2f}")

# -----------------------------
# Save results to Excel
# -----------------------------
wb = Workbook()
ws = wb.active
ws.title = "Money Detective"

ws.append(["Metric", "Value"])
ws.append(["Current Balance", current_balance])
ws.append(["Estimated Balance Before Next Pocket Money", estimated_balance])

ws.append([])
ws.append(["Recurring Charges"])

ws.append(["Description", "Months", "Occurrences", "Total Spent"])

for description, row in recurring.iterrows():
    ws.append([
        description,
        row["months"],
        row["count"],
        row["total"]
    ])

ws.append([])
ws.append(["Possible Duplicate Charges"])
ws.append(["Date", "Description", "Amount", "Occurrences"])

for _, row in duplicates.iterrows():
    ws.append([
        row["Date"].strftime("%Y-%m-%d"),
        row["What"],
        row["Amount"],
        row["Occurrences"]
    ])

wb.save("money_detective_results.xlsx")

print("\nResults saved to money_detective_results.xlsx")