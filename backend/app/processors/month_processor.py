class MonthProcessor:
    def process(self, parser_service, dataframe):
        return parser_service.parse_dataframe(dataframe)