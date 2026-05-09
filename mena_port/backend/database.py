from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Enum, create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, relationship
from datetime import datetime
import enum

# ============================================================================
# 1. إعدادات قاعدة البيانات (Database Configuration)
# ============================================================================

# للـ SQLite للتطوير
DATABASE_URL = "sqlite:///./portsight.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# الطريقة الحديثة لتعريف Base لتجنب التحذيرات
class Base(DeclarativeBase):
    pass

# ============================================================================
# 2. النماذج (Models) - تم تصحيح tablename هنا
# ============================================================================

class User(Base):
    """نموذج قاعدة البيانات للمستخدمين"""
    tablename = "users"  # تم إضافة الشرطات السفلية هنا
    
    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    full_name = Column(String)
    hashed_password = Column(String, nullable=False)
    
    role = Column(String, default="user")  # admin, operator, viewer
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)

class ActivityLog(Base):
    """نموذج قاعدة البيانات لسجل الأنشطة"""
    tablename = "activity_logs"  # تم إضافة الشرطات السفلية هنا
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    action = Column(String, nullable=False)
    entity_type = Column(String)
    entity_id = Column(String)
    details = Column(String)
    ip_address = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

# ============================================================================
# 3. وظائف قاعدة البيانات (Database Functions)
# ============================================================================

def get_db():
    """الحصول على جلسة قاعدة البيانات"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """تهيئة قاعدة البيانات وإنشاء الجداول"""
    Base.metadata.create_all(bind=engine)
    print("✅ تم إنشاء قاعدة البيانات بنجاح")

def reset_db():
    """إعادة تعيين قاعدة البيانات (حذف وإنشاء من جديد)"""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("✅ تم إعادة تعيين قاعدة البيانات بنجاح")

# ============================================================================
# 4. تشغيل الملف (تم تصحيح __name__)
# ============================================================================

if name == "__main__":
    print("🔧 جاري تهيئة قاعدة البيانات...")
    init_db()