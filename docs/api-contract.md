# API Contract

## POST /api/upload
Uploads an Excel workbook with `Month` and `Todate` sheets.

## GET /api/dashboard/summary?mode=month|todate
Returns executive summary.

## GET /api/dashboard/estates?mode=month|todate
Returns ordered estate list for sidebar.

## GET /api/dashboard/estate/{estate_key}?mode=month|todate
Returns estate detail payload.