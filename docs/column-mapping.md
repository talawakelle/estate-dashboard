# Column Mapping

Current parser uses the workbook structure provided by the user.

- Column B / index 1 = name
- Crop budget = index 6
- Crop actual = index 7
- Crop +/- = index 8
- NSA budget = index 12
- NSA actual = index 13
- COP budget = index 18
- COP actual = index 19
- Profit budget = index 26
- Profit actual = index 27

Update `backend/app/mappers/column_mapper.py` if the sheet structure changes.