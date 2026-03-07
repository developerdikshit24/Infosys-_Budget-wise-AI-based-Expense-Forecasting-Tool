from flask import Flask, request, jsonify
import pandas as pd
from prophet import Prophet

app = Flask(__name__)

@app.route("/analyze-expenses", methods=["POST"])
def analyze():

    data = request.json

    expenses = data["expenses"]
    categories = data["categories"]

    df = pd.DataFrame(expenses)

    df["ds"] = pd.to_datetime(df["month"])
    df["y"] = pd.to_numeric(df["total"])

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=1, freq="ME")
    forecast = model.predict(future)

    predicted_month = float(forecast.iloc[-1]["yhat"])
    suggested_budget = predicted_month * 0.85

    suggestions = []
    warnings = []

    # Highest category spending
    if categories:
        highest = max(categories, key=lambda x: x["total"])
        suggestions.append(
            f"Your highest spending category is {highest['category']}. Consider reducing expenses in this area."
        )

    # Spending trend
    last_month = float(df["y"].iloc[-1])

    if predicted_month > last_month:
        suggestions.append(
            "Your spending is expected to increase next month. Try controlling unnecessary purchases."
        )

    suggestions.append(
        f"Recommended monthly budget is ₹{round(suggested_budget)} to maintain financial stability."
    )

    # Overspending warning
    if predicted_month > last_month * 1.2:
        warnings.append("⚠ Your expenses may increase significantly next month.")

    if categories:
        total_spending = sum(c["total"] for c in categories)
        highest = max(categories, key=lambda x: x["total"])

        if highest["total"] / total_spending > 0.5:
            warnings.append(
                f"⚠ More than 50% of your expenses are in {highest['category']}."
            )

    return jsonify({
        "predicted_monthly_expense": round(predicted_month,2),
        "suggested_budget": round(suggested_budget,2),
        "warnings": warnings,
        "suggestions": suggestions
    })


if __name__ == "__main__":
    app.run(port=5001)