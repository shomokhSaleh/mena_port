from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from database import Base # افترضنا أن Base معرفة في ملف database.py

# ============================================================================
# 1. هيكلية الميناء (Ports -> Terminals -> Berths)
# ============================================================================

class Port(Base):
    """جدول الموانئ - كما في الصورة الأولى"""
    __tablename__ = "ports"
    
    port_id = Column(String, primary_key=True) # UUID in images
    port_name = Column(String, nullable=False)
    unlocode = Column(String) # رمز الميناء الدولي
    country = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    terminals = relationship("Terminal", back_populates="port")

class Terminal(Base):
    """جدول المحطات داخل الميناء"""
    __tablename__ = "terminals"
    
    terminal_id = Column(String, primary_key=True)
    port_id = Column(String, ForeignKey("ports.port_id"))
    terminal_name = Column(String, nullable=False)
    operator_company = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    port = relationship("Port", back_populates="terminals")
    berths = relationship("Berth", back_populates="terminal")
    cranes = relationship("Crane", back_populates="terminal")

class Berth(Base):
    """جدول الأرصفة - مرتبط بالمحطة"""
    __tablename__ = "berths"
    
    berth_id = Column(String, primary_key=True)
    terminal_id = Column(String, ForeignKey("terminals.terminal_id"))
    berth_name = Column(String, nullable=False)
    berth_type = Column(String)
    max_vessel_length = Column(Numeric)
    max_vessel_beam = Column(Numeric) # عرض السفينة
    max_draft = Column(Numeric) # العمق
    available_cranes = Column(Integer)
    hourly_rate = Column(Numeric)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    terminal = relationship("Terminal", back_populates="berths")
    schedules = relationship("Schedule", back_populates="berth")

# ============================================================================
# 2. السفن والزيارات (Vessels & Visits)
# ============================================================================

class Vessel(Base):
    """بيانات السفينة الثابتة"""
    __tablename__ = "vessels"
    
    vessel_id = Column(String, primary_key=True)
    vessel_name = Column(String, nullable=False)
    imo_number = Column(String, unique=True)
    vessel_type = Column(String)
    flag_state = Column(String)
    length_overall = Column(Numeric)
    beam_width = Column(Numeric)
    max_draft = Column(Numeric)
    container_capacity = Column(Integer) # TEU

    visits = relationship("VesselVisit", back_populates="vessel")

class VesselVisit(Base):
    """بيانات كل رحلة/زيارة محددة للسفينة"""
    __tablename__ = "vessel_visits"
    
    visit_id = Column(String, primary_key=True)
    vessel_id = Column(String, ForeignKey("vessels.vessel_id"))
    voyage_number = Column(String)
    eta = Column(DateTime) # موعد الوصول المتوقع
    etd = Column(DateTime) # موعد المغادرة المتوقع
    ata = Column(DateTime) # موعد الوصول الفعلي
    atd = Column(DateTime) # موعد المغادرة الفعلي
    status = Column(String) # Arrived, Departed, etc.

    vessel = relationship("Vessel", back_populates="visits")

# ============================================================================
# 3. العمليات (Cranes & Assignments)
# ============================================================================

class Crane(Base):
    """جدول الرافعات - موجود في الصور"""
    __tablename__ = "cranes"
    
    crane_id = Column(String, primary_key=True)
    terminal_id = Column(String, ForeignKey("terminals.terminal_id"))
    crane_name = Column(String)
    status = Column(String) # Maintenance, Operational

    terminal = relationship("Terminal", back_populates="cranes")