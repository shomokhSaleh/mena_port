from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# 1. جدول المستخدمين (الموظفين/المسؤولين)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

# 2. جدول الأرصفة (Berths)
class Berth(Base):
    __tablename__ = "berths"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, unique=True, index=True)
    status = Column(String, default="Available")  # متاح، مشغول، صيانة
    capacity = Column(Integer)

    # علاقة مع السفن: الرصيف الواحد قد يستقبل عدة سفن (على فترات)
    ships = relationship("Ship", back_populates="berth")

# 3. جدول السفن (Ships)
class Ship(Base):
    __tablename__ = "ships"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)  # ناقلة نفط، بضائع، إلخ
    arrival_time = Column(String)
    status = Column(String, default="Pending") # قادمة، راسية، مغادرة

    # ربط السفينة برصيف معين (Foreign Key)
    berth_id = Column(Integer, ForeignKey("berths.id"))
    
    # تعريف العلاقة العكسية
    berth = relationship("Berth", back_populates="ships")
