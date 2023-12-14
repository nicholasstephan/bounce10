# Money Score

MoneyScore is an [activity](./activities.md). It is stored in firestore `/activities/{activity id}`.

| Property      | Description
| ---           | ---
| name          | "Money Score"
| questions     | Array of objects with the following properties:
|               | - `question`: The question text.
|               | - `section`: The section the question belongs to.
|               | - `answer`: The answer as a number between 1 and 5.


## Sections

- Save
- Citizen
- Credit
- Spend
- Paid
- Talk about Money
- Invest
- Change the World
- Entrepreneurial Spirit
- Budget

_Stored against each question as `section` in lowercase._