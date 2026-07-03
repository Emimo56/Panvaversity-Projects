# Scores
homework = [60, 92, 88, 45, 90, 85]
quizzes = [70, 95, 88, 100, 0, 91, 84, 77, 93, 80]
midterm = 72
final = 86

# -----------------------------
# Homework (20%)
# Drop the two lowest scores
# -----------------------------
homework_kept = sorted(homework)[2:]
homework_average = sum(homework_kept) / len(homework_kept)
homework_contribution = homework_average * 0.20

# -----------------------------
# Quizzes (20%)
# Keep the best 8 of 10
# -----------------------------
quiz_kept = sorted(quizzes, reverse=True)[:8]
quiz_average = sum(quiz_kept) / len(quiz_kept)
quiz_contribution = quiz_average * 0.20

# -----------------------------
# Midterm / Final rule
# If final > midterm, final replaces midterm
# -----------------------------
effective_midterm = max(midterm, final)

midterm_contribution = effective_midterm * 0.25
final_contribution = final * 0.35

# -----------------------------
# Overall Grade
# -----------------------------
overall_grade = (
    homework_contribution
    + quiz_contribution
    + midterm_contribution
    + final_contribution
)

# -----------------------------
# Required final for a 90%
# Since the desired final will be higher than the
# midterm, it replaces the midterm.
# -----------------------------
target_grade = 90

constant_part = homework_contribution + quiz_contribution

required_final = (
    target_grade - constant_part
) / (0.25 + 0.35)

# -----------------------------
# Output
# -----------------------------
print("Homework")
print("Dropped:", sorted(homework)[:2])
print("Counted:", homework_kept)
print(f"Average: {homework_average:.2f}")
print(f"Contribution: {homework_contribution:.2f}")

print("\nQuizzes")
print("Counted:", quiz_kept)
print(f"Average: {quiz_average:.2f}")
print(f"Contribution: {quiz_contribution:.2f}")

print("\nMidterm / Final")
print("Original Midterm:", midterm)
print("Final:", final)
print("Effective Midterm:", effective_midterm)
print(f"Midterm Contribution: {midterm_contribution:.2f}")
print(f"Final Contribution: {final_contribution:.2f}")

print("\nOverall Grade")
print(f"{overall_grade:.2f}%")

print("\nRequired Final for a 90% Overall")
print(f"{required_final:.2f}%")