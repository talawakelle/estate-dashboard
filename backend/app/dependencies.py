from app.repositories.cache_repository import CacheRepository
from app.repositories.workbook_repository import WorkbookRepository
from app.services.chart_service import ChartService
from app.services.estate_service import EstateService
from app.services.excel_reader_service import ExcelReaderService
from app.services.parser_service import ParserService
from app.services.status_service import StatusService
from app.services.summary_service import SummaryService
from app.services.upload_service import UploadService


cache_repository = CacheRepository()
workbook_repository = WorkbookRepository()

status_service = StatusService()
excel_reader_service = ExcelReaderService()
parser_service = ParserService(status_service=status_service)
estate_service = EstateService(cache_repository=cache_repository)
summary_service = SummaryService(cache_repository=cache_repository)
chart_service = ChartService()

upload_service = UploadService(
    workbook_repository=workbook_repository,
    cache_repository=cache_repository,
    excel_reader_service=excel_reader_service,
    parser_service=parser_service,
)