
import uvicorn
from config import settings

def main():
    """تشغيل خادم FastAPI"""
    
    print("=" * 60)
    print(f"🚀 {settings.APP_NAME} v{settings.APP_VERSION}")
    print("=" * 60)
    print(f"📍 الخادم: http://{settings.HOST}:{settings.PORT}")
    print(f"📚 التوثيق: http://localhost:{settings.PORT}/api/docs")
    print(f"📊 ReDoc: http://localhost:{settings.PORT}/api/redoc")
    print("=" * 60)
    print("⚡ لإيقاف الخادم: اضغط Ctrl+C")
    print("=" * 60)
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
        access_log=True,
    )

if __name__ == "__main__":
    main()
