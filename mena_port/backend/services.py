
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
import math

# =============================================
# Berth Scheduling Service
# =============================================

class BerthSchedulingService:
    """خدمة جدولة الأرصفة والتحسين"""
    
    @staticmethod
    def detect_conflicts(
        berth_id: str,
        arrival: datetime,
        departure: datetime,
        existing_schedules: List[Dict]
    ) -> List[Dict]:
        """
        كشف التعارضات في الجدولة
        
        Args:
            berth_id: معرف الرصيف
            arrival: وقت الوصول المخطط
            departure: وقت المغادرة المخطط
            existing_schedules: الجداول الموجودة
            
        Returns:
            قائمة التعارضات المكتشفة
        """
        conflicts = []
        
        for schedule in existing_schedules:
            if schedule["berth_id"] != berth_id:
                continue
            
            # تحقق من تداخل الأوقات
            schedule_arrival = schedule["arrival_time"]
            schedule_departure = schedule["departure_time"]
            
            # حالة التداخل: الوصول قبل مغادرة سفينة أخرى والمغادرة بعد وصولها
            if arrival < schedule_departure and departure > schedule_arrival:
                overlap_start = max(arrival, schedule_arrival)
                overlap_end = min(departure, schedule_departure)
                overlap_duration = (overlap_end - overlap_start).total_seconds() / 3600
                
                conflicts.append({
                    "schedule_id": schedule["id"],
                    "ship_name": schedule["ship_name"],
                    "overlap_duration_hours": overlap_duration,
                    "severity": "high" if overlap_duration > 2 else "medium"
                })
        
        return conflicts
    
    @staticmethod
    def calculate_optimal_berth(
        ship_specs: Dict,
        available_berths: List[Dict],
        time_window: Tuple[datetime, datetime]
    ) -> Optional[Dict]:
        """
        حساب الرصيف الأمثل للسفينة
        
        Args:
            ship_specs: مواصفات السفينة (الطول، العمق، النوع)
            available_berths: الأرصفة المتاحة
            time_window: نافذة الوقت المطلوبة
            
        Returns:
            الرصيف الأمثل أو None
        """
        ship_length = ship_specs.get("length", 0)
        ship_draft = ship_specs.get("draft", 0)
        cargo_type = ship_specs.get("cargo_type", "")
        
        suitable_berths = []
        
        for berth in available_berths:
            # تحقق من التوافق الفيزيائي
            berth_length = float(berth["length"].replace("م", ""))
            berth_depth = float(berth["depth"].replace("م", ""))
            
            if ship_length > berth_length:
                continue
            
            if ship_draft > berth_depth:
                continue
            
            # حساب درجة الملاءمة
            length_utilization = ship_length / berth_length
            depth_margin = berth_depth - ship_draft
            
            # نقاط الأفضلية
            score = 0
            score += length_utilization * 50  # الاستخدام الأمثل للطول
            score += min(depth_margin, 5) * 10  # هامش العمق
            
            # تفضيل الأرصفة المتخصصة
            if cargo_type == "حاويات" and berth["capacity"] == "كبير":
                score += 20
            
            suitable_berths.append({
                "berth": berth,
                "score": score,
                "length_utilization": f"{length_utilization*100:.1f}%",
                "depth_margin": f"{depth_margin:.1f}م"
            })
        
        if not suitable_berths:
            return None
        
        # إرجاع الرصيف صاحب أعلى نقاط
        return max(suitable_berths, key=lambda x: x["score"])
    
    @staticmethod
    def estimate_turnaround_time(cargo_type: str, containers: int, ship_size: str) -> float:
        """
        تقدير وقت دوران السفينة (وقت البقاء في الميناء)
        
        Args:
            cargo_type: نوع الشحنة
            containers: عدد الحاويات
            ship_size: حجم السفينة
            
        Returns:
            الوقت المقدر بالساعات
        """
        base_time = 2.0  # ساعتان كحد أدنى
        
        # حسب نوع الشحنة
        cargo_multipliers = {
            "حاويات": 1.0,
            "حاويات مبردة": 1.3,
            "سائبة": 1.5,
            "سوائل": 1.2,
            "عامة": 1.4
        }
        
        multiplier = cargo_multipliers.get(cargo_type, 1.0)
        
        # حسب عدد الحاويات
        container_time = containers * 0.02  # 1.2 دقيقة لكل حاوية
        
        # حسب حجم السفينة
        size_multipliers = {"صغير": 0.8, "متوسط": 1.0, "كبير": 1.3}
        size_multiplier = size_multipliers.get(ship_size, 1.0)
        
        total_time = (base_time + container_time) * multiplier * size_multiplier
        
        return round(total_time, 2)

# ============================================================================
# Workforce Optimization Service
# ============================================================================

class WorkforceOptimizationService:
    """خدمة تحسين تخصيص القوى العاملة"""
    
    @staticmethod
    def calculate_required_personnel(
        cargo_type: str,
        containers: int,
        turnaround_time: float
    ) -> int:
        """
        حساب عدد الأفراد المطلوبين
        
        Args:
            cargo_type: نوع الشحنة
            containers: عدد الحاويات
            turnaround_time: وقت الدوران المتوقع
            
        Returns:
            عدد الأفراد المطلوبين
        """
        # معدلات الإنتاجية (حاويات/شخص/ساعة)
        productivity_rates = {
            "حاويات": 5,
            "حاويات مبردة": 4,
            "سائبة": 3,
            "سوائل": 6,
            "عامة": 4
        }
        
        rate = productivity_rates.get(cargo_type, 4)
        
        # حساب عدد الأفراد
        required = math.ceil(containers / (rate * turnaround_time))
        
        # حد أدنى وحد أقصى
        return max(4, min(required, 20))
    
    @staticmethod
    def assign_crew_to_berth(
        berth_schedules: List[Dict],
        available_crews: List[Dict]
    ) -> List[Dict]:
        """
        تخصيص الطواقم للأرصفة بشكل أمثل
        
        Args:
            berth_schedules: جداول الأرصفة
            available_crews: الطواقم المتاحة
            
        Returns:
            قائمة التخصيصات
        """
        assignments = []
        used_crews = set()
        
        # ترتيب الجداول حسب الأولوية
        sorted_schedules = sorted(
            berth_schedules,
            key=lambda x: (x.get("priority", 1), x["arrival_time"])
        )
        
        for schedule in sorted_schedules:
            cargo_type = schedule["cargo_type"]
            
            # البحث عن طاقم متخصص متاح
            for crew in available_crews:
                if crew["id"] in used_crews:
                    continue
                
                if crew["specialization"] == cargo_type or crew["specialization"] == "عام":
                    assignments.append({
                        "schedule_id": schedule["id"],
                        "berth_id": schedule["berth_id"],
                        "crew_id": crew["id"],
                        "crew_name": crew["name"],
                        "personnel_count": crew["size"],
                        "supervisor": crew["supervisor"]
                    })
                    used_crews.add(crew["id"])
                    break
        
        return assignments

# ============================================================================
# Performance Analytics Service
# ============================================================================

class PerformanceAnalyticsService:
    """خدمة تحليلات الأداء"""
    
    @staticmethod
    def calculate_berth_utilization(
        schedules: List[Dict],
        berths: List[Dict],
        time_period: timedelta
    ) -> Dict:
        """
        حساب نسبة استغلال الأرصفة
        
        Args:
            schedules: جداول الرسو
            berths: الأرصفة
            time_period: الفترة الزمنية للتحليل
            
        Returns:
            إحصائيات الاستغلال
        """
        total_hours = time_period.total_seconds() / 3600
        berth_count = len(berths)
        total_available_hours = total_hours * berth_count
        
        total_occupied_hours = 0
        for schedule in schedules:
            duration = (schedule["departure_time"] - schedule["arrival_time"]).total_seconds() / 3600
            total_occupied_hours += duration
        
        utilization_rate = (total_occupied_hours / total_available_hours) * 100
        
        return {
            "total_berths": berth_count,
            "total_available_hours": round(total_available_hours, 2),
            "total_occupied_hours": round(total_occupied_hours, 2),
            "utilization_rate": round(utilization_rate, 2),
            "efficiency_status": "ممتاز" if utilization_rate > 80 else "جيد" if utilization_rate > 60 else "متوسط"
        }
    
    @staticmethod
    def calculate_kpis(
        schedules: List[Dict],
        shipments: List[Dict],
        time_period: timedelta
    ) -> Dict:
        """
        حساب مؤشرات الأداء الرئيسية (KPIs)
        
        Args:
            schedules: جداول الرسو
            shipments: الشحنات
            time_period: الفترة الزمنية
            
        Returns:
            مؤشرات الأداء
        """
        # متوسط وقت الدوران
        turnaround_times = []
        for schedule in schedules:
            if schedule.get("actual_arrival") and schedule.get("actual_departure"):
                duration = (schedule["actual_departure"] - schedule["actual_arrival"]).total_seconds() / 3600
                turnaround_times.append(duration)
        
        avg_turnaround = sum(turnaround_times) / len(turnaround_times) if turnaround_times else 0
        
        # معدل التأخير
        delayed_count = len([s for s in schedules if s["status"] == "delayed"])
        delay_rate = (delayed_count / len(schedules)) * 100 if schedules else 0
        
        # إجمالي الحاويات
        total_containers = sum([s.get("containers", 0) or 0 for s in schedules])
        
        # معدل الإنتاجية (حاويات/ساعة)
        total_hours = sum(turnaround_times)
        productivity = total_containers / total_hours if total_hours > 0 else 0
        
        return {
            "average_turnaround_time": round(avg_turnaround, 2),
            "delay_rate": round(delay_rate, 2),
            "total_containers_processed": total_containers,
            "productivity_rate": round(productivity, 2),
            "total_ships_handled": len(schedules),
            "on_time_performance": round(100 - delay_rate, 2)
        }

# ============================================================================
# Route Optimization Service
# ============================================================================

class RouteOptimizationService:
    """خدمة تحسين المسارات"""
    
    @staticmethod
    def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """
        حساب المسافة بين نقطتين جغرافيتين (Haversine formula)
        
        Args:
            lat1, lon1: إحداثيات النقطة الأولى
            lat2, lon2: إحداثيات النقطة الثانية
            
        Returns:
            المسافة بالكيلومترات
        """
        R = 6371  # نصف قطر الأرض بالكيلومترات
        
        lat1_rad = math.radians(lat1)
        lat2_rad = math.radians(lat2)
        delta_lat = math.radians(lat2 - lat1)
        delta_lon = math.radians(lon2 - lon1)
        
        a = (math.sin(delta_lat / 2) ** 2 +
             math.cos(lat1_rad) * math.cos(lat2_rad) *
             math.sin(delta_lon / 2) ** 2)
        
        c = 2 * math.asin(math.sqrt(a))
        distance = R * c
        
        return round(distance, 2)
    
    @staticmethod
    def estimate_arrival_time(
        distance_km: float,
        ship_speed_knots: float = 15.0
    ) -> datetime:
        """
        تقدير وقت الوصول
        
        Args:
            distance_km: المسافة بالكيلومترات
            ship_speed_knots: سرعة السفينة بالعقدة
            
        Returns:
            وقت الوصول المقدر
        """
        # تحويل من عقدة إلى كم/ساعة
        speed_kmh = ship_speed_knots * 1.852
        
        # حساب الوقت المطلوب
        hours = distance_km / speed_kmh
        
        # إضافة الوقت الحالي
        arrival = datetime.now() + timedelta(hours=hours)
        
        return arrival

# ============================================================================
# Weather Impact Service
# ============================================================================

class WeatherImpactService:
    """خدمة تقييم تأثير الطقس"""
    
    @staticmethod
    def assess_weather_risk(
        wind_speed: float,
        wave_height: float,
        visibility: float
    ) -> Dict:
        """
        تقييم مخاطر الطقس على العمليات
        
        Args:
            wind_speed: سرعة الرياح (كم/س)
            wave_height: ارتفاع الأمواج (متر)
            visibility: الرؤية (كم)
            
        Returns:
            تقييم المخاطر والتوصيات
        """
        risk_level = "low"
        recommendations = []
        
        # تقييم الرياح
        if wind_speed > 60:
            risk_level = "critical"
            recommendations.append("إيقاف جميع العمليات البحرية فوراً")
        elif wind_speed > 45:
            risk_level = "high"
            recommendations.append("تعليق عمليات الشحن والتفريغ")
        elif wind_speed > 30:
            risk_level = "medium"
            recommendations.append("الحذر عند تنفيذ العمليات")
        
        # تقييم الأمواج
        if wave_height > 3:
            risk_level = max(risk_level, "high", key=["low", "medium", "high", "critical"].index)
            recommendations.append("منع رسو السفن الصغيرة")
        elif wave_height > 2:
            recommendations.append("تأخير عمليات نقل الحاويات")
        
        # تقييم الرؤية
        if visibility < 2:
            risk_level = "high"
            recommendations.append("تفعيل إجراءات الملاحة في الضباب")
        elif visibility < 5:
            recommendations.append("زيادة الحذر في التنقل")
        
        return {
            "risk_level": risk_level,
            "recommendations": recommendations,
            "safe_for_operations": risk_level in ["low", "medium"]
        }

# ============================================================================
# Validation Service
# ============================================================================

class ValidationService:
    """خدمة التحقق من صحة البيانات"""
    
    @staticmethod
    def validate_berth_compatibility(ship: Dict, berth: Dict) -> Tuple[bool, List[str]]:
        """
        التحقق من توافق السفينة مع الرصيف
        
        Args:
            ship: بيانات السفينة
            berth: بيانات الرصيف
            
        Returns:
            (متوافق؟, قائمة الأخطاء/التحذيرات)
        """
        errors = []
        
        # التحقق من الطول
        if ship.get("length", 0) > float(berth.get("length", "0").replace("م", "")):
            errors.append(f"السفينة أطول من الرصيف ({ship['length']}م > {berth['length']})")
        
        # التحقق من العمق
        if ship.get("draft", 0) > float(berth.get("depth", "0").replace("م", "")):
            errors.append(f"غاطس السفينة أعمق من عمق الرصيف ({ship['draft']}م > {berth['depth']})")
        
        # التحقق من حالة الرصيف
        if berth.get("status") == "maintenance":
            errors.append("الرصيف تحت الصيانة حالياً")
        elif berth.get("status") == "occupied":
            errors.append("الرصيف مشغول بسفينة أخرى")
        
        return len(errors) == 0, errors
    
    @staticmethod
    def validate_schedule_timing(arrival: datetime, departure: datetime) -> Tuple[bool, List[str]]:
        """
        التحقق من صحة توقيتات الجدولة
        
        Args:
            arrival: وقت الوصول
            departure: وقت المغادرة
            
        Returns:
            (صحيح؟, قائمة الأخطاء)
        """
        errors = []
        
        # التحقق من أن المغادرة بعد الوصول
        if departure <= arrival:
            errors.append("وقت المغادرة يجب أن يكون بعد وقت الوصول")
        
        # التحقق من أن الوصول ليس في الماضي
        if arrival < datetime.now():
            errors.append("وقت الوصول في الماضي")
        
        # التحقق من المدة المعقولة
        duration = (departure - arrival).total_seconds() / 3600
        if duration < 1:
            errors.append("مدة الرسو قصيرة جداً (أقل من ساعة)")
        elif duration > 72:
            errors.append("مدة الرسو طويلة جداً (أكثر من 3 أيام)")
        
        return len(errors) == 0, errors
