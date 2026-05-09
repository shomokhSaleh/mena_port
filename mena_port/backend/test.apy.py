
import requests
from datetime import datetime, timedelta
import json

# عنوان API
BASE_URL = "http://localhost:8000"

def print_section(title):
    """طباعة عنوان القسم"""
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def test_root():
    """اختبار الصفحة الرئيسية"""
    print_section("اختبار الصفحة الرئيسية")
    response = requests.get(f"{BASE_URL}/")
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))

def test_health():
    """اختبار صحة النظام"""
    print_section("اختبار صحة النظام")
    response = requests.get(f"{BASE_URL}/health")
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))

def test_statistics():
    """اختبار الإحصائيات"""
    print_section("اختبار الإحصائيات")
    response = requests.get(f"{BASE_URL}/api/statistics")
    data = response.json()
    print(f"السفن النشطة: {data['active_ships']}")
    print(f"إجمالي الحاويات: {data['total_containers']}")
    print(f"متوسط وقت الدوران: {data['average_turnaround_time']} ساعة")
    print(f"الإيرادات: ${data['revenue']:,.0f}")
    print(f"الأرصفة المشغولة: {data['berths_occupied']}")
    print(f"الأرصفة المتاحة: {data['berths_available']}")

def test_berths():
    """اختبار الأرصفة"""
    print_section("اختبار قائمة الأرصفة")
    response = requests.get(f"{BASE_URL}/api/berths")
    berths = response.json()
    print(f"عدد الأرصفة: {len(berths)}\n")
    
    for berth in berths[:3]:  # عرض أول 3 أرصفة
        print(f"🚢 {berth['name']} ({berth['id']})")
        print(f"   الحالة: {berth['status']}")
        print(f"   السعة: {berth['capacity']}")
        print(f"   العمق: {berth['depth']} | الطول: {berth['length']}")
        print()

def test_schedules():
    """اختبار الجداول"""
    print_section("اختبار جداول الرسو")
    response = requests.get(f"{BASE_URL}/api/schedules")
    schedules = response.json()
    print(f"عدد الجداول: {len(schedules)}\n")
    
    for schedule in schedules[:3]:
        print(f"📅 {schedule['ship_name']} - {schedule['berth_id']}")
        print(f"   الوصول: {schedule['arrival_time']}")
        print(f"   المغادرة: {schedule['departure_time']}")
        print(f"   الحالة: {schedule['status']}")
        print(f"   الحاويات: {schedule.get('containers', 'N/A')}")
        if schedule['conflicts']:
            print(f"   ⚠️  تعارضات: {len(schedule['conflicts'])}")
        print()

def test_create_schedule():
    """اختبار إنشاء جدولة جديدة"""
    print_section("اختبار إنشاء جدولة جديدة")
    
    new_schedule = {
        "berth_id": "B5",
        "ship_id": "SH-TEST-001",
        "ship_name": "Test Ship Alpha",
        "arrival_time": (datetime.now() + timedelta(hours=24)).isoformat(),
        "departure_time": (datetime.now() + timedelta(hours=30)).isoformat(),
        "status": "scheduled",
        "cargo_type": "حاويات",
        "containers": 150
    }
    
    response = requests.post(
        f"{BASE_URL}/api/schedules",
        json=new_schedule
    )
    
    result = response.json()
    print(f"الرسالة: {result['message']}")
    print(f"تعارضات: {'نعم' if result['has_conflicts'] else 'لا'}")
    print(f"معرف الجدولة: {result['schedule']['id']}")

def test_validate_schedule():
    """اختبار التحقق من صحة الجدولة"""
    print_section("اختبار التحقق من صحة الجدولة")
    
    params = {
        "berth_id": "B1",
        "arrival_time": (datetime.now() + timedelta(hours=1)).isoformat(),
        "departure_time": (datetime.now() + timedelta(hours=5)).isoformat()
    }
    
    response = requests.post(
        f"{BASE_URL}/api/schedules/validate",
        params=params
    )
    
    validation = response.json()
    print(f"صالح: {'✅ نعم' if validation['valid'] else '❌ لا'}")
    print(f"حالة الرصيف: {validation['berth_status']}")
    
    if validation['conflicts']:
        print("\nالتعارضات:")
        for conflict in validation['conflicts']:
            print(f"  - {conflict}")

def test_workforce():
    """اختبار القوى العاملة"""
    print_section("اختبار تعيينات القوى العاملة")
    response = requests.get(f"{BASE_URL}/api/workforce")
    assignments = response.json()
    
    print(f"عدد التعيينات: {len(assignments)}\n")
    
    for assignment in assignments:
        print(f"👷 {assignment['crew_name']} - رصيف {assignment['berth_id']}")
        print(f"   عدد الأفراد: {assignment['personnel_count']}")
        print(f"   المشرف: {assignment['supervisor']}")
        print(f"   التخصص: {assignment['specialization']}")
        print()

def test_shipments():
    """اختبار الشحنات"""
    print_section("اختبار تتبع الشحنات")
    response = requests.get(f"{BASE_URL}/api/shipments")
    shipments = response.json()
    
    print(f"عدد الشحنات: {len(shipments)}\n")
    
    for shipment in shipments:
        print(f"📦 {shipment['ship_name']} ({shipment['id']})")
        print(f"   من: {shipment['origin']}")
        print(f"   إلى: {shipment['destination']}")
        print(f"   الحالة: {shipment['status']}")
        print(f"   الموقع: {shipment['location']['description']}")
        print()

def test_alerts():
    """اختبار التنبيهات"""
    print_section("اختبار التنبيهات")
    response = requests.get(f"{BASE_URL}/api/alerts")
    alerts = response.json()
    
    print(f"عدد التنبيهات: {len(alerts)}\n")
    
    for alert in alerts[:5]:
        icon = "🔴" if alert['type'] == "critical" else "⚠️" if alert['type'] == "warning" else "ℹ️"
        status = "✅ تم الحل" if alert['resolved'] else "⏳ قيد المعالجة"
        
        print(f"{icon} {alert['title']}")
        print(f"   النوع: {alert['type']}")
        print(f"   الرسالة: {alert['message']}")
        print(f"   الحالة: {status}")
        print()

def test_analytics():
    """اختبار التحليلات"""
    print_section("اختبار تحليلات الأداء")
    response = requests.get(f"{BASE_URL}/api/analytics/performance")
    data = response.json()
    
    print(f"الفترة: {data['period']}")
    print(f"إجمالي السفن: {data['total_ships']}")
    print(f"إجمالي الحاويات: {data['total_containers']:,}")
    print(f"متوسط الدوران: {data['average_turnaround']} ساعة")
    print(f"معدل الكفاءة: {data['efficiency_rate']}%")
    print(f"الإيرادات الشهرية: ${data['monthly_revenue']:,}")
    
    print("\nالاتجاهات:")
    for key, value in data['trends'].items():
        print(f"  {key}: {value}")

def test_weather():
    """اختبار معلومات الطقس"""
    print_section("اختبار معلومات الطقس")
    response = requests.get(f"{BASE_URL}/api/weather")
    data = response.json()
    
    print(f"🌡️  درجة الحرارة: {data['temperature']}°C")
    print(f"💧 الرطوبة: {data['humidity']}%")
    print(f"💨 سرعة الرياح: {data['wind_speed']} كم/س")
    print(f"🧭 اتجاه الرياح: {data['wind_direction']}")
    print(f"👁️  الرؤية: {data['visibility']} كم")
    print(f"☁️  الحالة: {data['conditions']}")
    print(f"🌊 حالة البحر: {data['sea_state']}")
    
    if data['warnings']:
        print("\n⚠️  التحذيرات:")
        for warning in data['warnings']:
            print(f"  - {warning}")

def run_all_tests():
    """تشغيل جميع الاختبارات"""
    print("\n" + "="*60)
    print("  🧪 بدء اختبارات Portsight API")
    print("="*60)
    
    try:
        test_root()
        test_health()
        test_statistics()
        test_berths()
        test_schedules()
        test_validate_schedule()
        test_workforce()
        test_shipments()
        test_alerts()
        test_analytics()
        test_weather()
        
        print("\n" + "="*60)
        print("  ✅ اكتملت جميع الاختبارات بنجاح!")
        print("="*60)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ خطأ: لا يمكن الاتصال بالخادم")
        print("تأكد من تشغيل الخادم على http://localhost:8000")
        print("قم بتشغيل: python run.py")
        
    except Exception as e:
        print(f"\n❌ خطأ في الاختبار: {e}")

if __name__ == "__main__":
    run_all_tests()
