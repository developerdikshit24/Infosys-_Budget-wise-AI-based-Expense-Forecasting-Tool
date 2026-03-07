from flask import Flask, request, jsonify
import pandas as pd
from prophet import Prophet

app = Flask(__name__)

@app.route("/analyze-expenses", methods=["POST"])
def analyze():

    data = request.json

    expenses = data["expenses"]
    categories = data["categories"]
    user_budget = data.get("budget", 0)

    df = pd.DataFrame(expenses)

    df["ds"] = pd.to_datetime(df["month"])
    df["y"] = pd.to_numeric(df["total"])

    df = df[["ds", "y"]]

    if len(df) < 3:
        return jsonify({"error": "Not enough data for AI prediction"})

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=1, freq="ME")
    forecast = model.predict(future)

    predicted_month = float(forecast.iloc[-1]["yhat"])
    predicted_month = max(predicted_month, 0)

    suggested_budget = predicted_month * 0.85

    last_month = float(df["y"].iloc[-1])

    increase_percent = 0
    if last_month > 0:
        increase_percent = ((predicted_month - last_month) / last_month) * 100

    predicted_balance = user_budget - predicted_month

    suggestions = []
    warnings = []
    actions = []
    category_distribution = []

    highest = None
    total_spending = 0

    if categories:
        total_spending = sum(c["total"] for c in categories)
        highest = max(categories, key=lambda x: x["total"])

        for c in categories:
            percent = (c["total"] / total_spending) * 100

            category_distribution.append({
                "category": c["category"],
                "amount": c["total"],
                "percent": round(percent,1)
            })

        highest_percent = (highest["total"] / total_spending) * 100

        suggestions.append(
            f"{round(highest_percent,1)}% of your expenses are spent on {highest['category']}."
        )

        if highest_percent > 50:
            warnings.append(
                f"More than 50% of your spending is in {highest['category']}."
            )

    if predicted_month > last_month:
        suggestions.append(
            "Your spending trend indicates a possible increase next month."
        )

    saving_percent = 0
    if predicted_month > 0:
        saving_percent = ((predicted_month - suggested_budget) / predicted_month) * 100

    suggestions.append(
        f"Reduce spending by {round(saving_percent,1)}% to stay within the suggested budget."
    )

    if increase_percent > 5:
        warnings.append(
            f"Expenses may increase by {round(increase_percent,1)}% next month."
        )

    # Suggested actions
    if predicted_month > user_budget:
        actions.append(f"Stay within ₹{round(user_budget)} total budget")

    if increase_percent > 5:
        actions.append("Adjust budget for predicted increase")

    actions.append("Monitor discretionary spending closely")

    return jsonify({
        "predicted_monthly_expense": round(predicted_month,2),
        "suggested_budget": round(suggested_budget,2),
        "increase_percent": round(increase_percent,1),
        "predicted_balance": round(predicted_balance,2),
        "category_distribution": category_distribution,
        "warnings": warnings,
        "suggestions": suggestions,
        "actions": actions
    })


if __name__ == "__main__":
    app.run(port=5001)