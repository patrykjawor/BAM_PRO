from django.http import JsonResponse, HttpResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods, require_GET
from django.db.models import Q
from .models import UserProfile, CreditStorage
from .serializers import CreditSerializer
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django_otp.plugins.otp_totp.models import TOTPDevice
from base64 import b32encode

def index(request):
    """
    Widok wyświetlający prosty komunikat "Hello there from index!".

    :param request: HttpRequest
    :return: HttpResponse z komunikatem
    """
    return HttpResponse("Hello there from index!")

@csrf_exempt
def register_view(request):
    """
    Widok rejestracji nowego użytkownika.

    Obsługuje żądania typu POST zawierające dane niezbędne do rejestracji nowego użytkownika.
    Po sukcesie zwraca komunikat o rejestracji oraz wygenerowany sekret TOTP.

    :param request: HttpRequest
    :return: JsonResponse z komunikatem o sukcesie lub błędzie
    """
    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            email = request.POST.get('email')
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')

            # check password
            if password1 != password2:
                return JsonResponse({'error': 'Passwords do not match', 'status': 400})

            # check username
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username is already taken', 'status': 401})

            # Create the user
            user = User.objects.create_user(username=username, email=email, password=password1)
            totp_device = TOTPDevice.objects.create(user=user, confirmed=False)
            totp_device.save()
            device = TOTPDevice.objects.get(user=user)
            secret_key = b32encode(device.bin_key).decode('utf-8')
            profile, created = UserProfile.objects.get_or_create(user=user)
            profile.totp_device = totp_device
            profile.save()
            print(secret_key)
            return JsonResponse({'message': 'User registered successfully.', 'secret':secret_key, 'status':200})
        
        except Exception as e:
            return JsonResponse({'error': str(e),  'status':500})

    else:
        return JsonResponse({'error': 'Invalid request method', 'status':405})
    
@csrf_exempt
def login_view(request):
    """
    Widok logowania użytkownika.

    Obsługuje żądania typu POST zawierające dane logowania.
    Zwraca komunikat po pomyślnym zalogowaniu lub błąd przy nieudanym logowaniu.

    :param request: HttpRequest
    :return: JsonResponse z komunikatem o sukcesie lub błędzie
    """
    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                return JsonResponse({'message':'All good in sucessfully', 'status':200})
            else:
                return JsonResponse({'error':'Invalid username or password', 'status':400})
        except Exception as e:
            return JsonResponse({'error':str(e),  'status':500})
    return JsonResponse({'error': 'Invalid request method', 'status':405})

@csrf_exempt
def authenticate_view(request):
    """
    Widok uwierzytelniania użytkownika z dwuetapową weryfikacją.

    Obsługuje żądania typu POST zawierające dane uwierzytelniania i kod dwuetapowy TOTP.
    Dokonuje uwierzytelniania użytkownika i kodu TOTP, zwraca komunikat o sukcesie lub błędzie.

    :param request: HttpRequest
    :return: JsonResponse z komunikatem o sukcesie lub błędzie
    """
    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')
            totp_code = request.POST.get('password2FA')
            print(totp_code)
            user = authenticate(request, username=username, password=password)
            print("User", user)
            totp_device = TOTPDevice.objects.get(user=user)
            print("Totp_device", totp_device)
            if totp_device.verify_token(totp_code):
                login(request, user)
                return JsonResponse({'message': 'User logged in successfully', 'status' : 200}) 
            else:
                return JsonResponse({'error': 'Invalid 2FA code', 'status':400})
        except Exception as e:
            return JsonResponse({'error':str(e), 'status':500}, )
    return JsonResponse({'error': 'Invalid request method', 'status':405})


@require_GET
def status(request):
    """
    Widok zwracający status uwierzytelnienia użytkownika.

    :param request: HttpRequest
    :return: JsonResponse z informacją o stanie uwierzytelnienia
    """
    return JsonResponse({"authenticated": request.user.is_authenticated})

@require_http_methods(["POST"])
@csrf_exempt
def add_service(request:HttpRequest):
    """
    Widok dodawania nowej usługi.

    Dodaje nową usługę do bazy danych, wymaga uwierzytelnienia.
    Otrzymuje dane usługi (nazwę, użytkownika, hasło, ikonę) i zapisuje je do bazy danych.

    :param request: HttpRequest
    :return: JsonResponse z komunikatem o sukcesie lub błędzie
    """
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Please log in first"}, status=401)
    try:
        name = request.POST.get("name")
        username = request.POST.get("username")
        password = request.POST.get("password")
        icon = request.POST.get("icon")
        user = User.objects.filter(username=request.user.username).first()
        CreditStorage(
            user=user,
            name=name,
            username=username,
            password=password,
            icon=icon
        ).save()
        return JsonResponse({"message": "Credentials saved successfully!"})
    except Exception as e:
        print(e)
        return JsonResponse({"error": "Something went wrong when processing request"}, status=500)
    
@require_http_methods(["POST"])
@csrf_exempt
def delete_service(request:HttpRequest, id:int):
    """
    Widok usuwania usługi.

    Usuwa usługę z bazy danych na podstawie przekazanego identyfikatora.
    Wymaga uwierzytelnienia.

    :param request: HttpRequest
    :param id: Identyfikator usługi do usunięcia
    :return: JsonResponse z komunikatem o sukcesie lub błędzie
    """
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Please log in first"}, status=401)
    try:
        user = User.objects.filter(username=request.user.username).first()
        CreditStorage.objects.get(Q(pk=id) & Q(user=user.pk)).delete()
        return JsonResponse({"message": "Data deleted successfully"})
    except Exception as e:
        print(e)
        return JsonResponse({"error": "Something went wrong when processing request"}, status=500)    
       

@require_GET
def list_services(request:HttpRequest):
    """
    Widok listowania usług użytkownika.

    Zwraca listę usług użytkownika z bazy danych.
    Wymaga uwierzytelnienia.

    :param request: HttpRequest
    :return: JsonResponse z listą usług lub komunikatem o błędzie
    """
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Please log in first"}, status=401)
    data = CreditStorage.objects.all().filter(user=request.user.pk)
    return JsonResponse({"services": CreditSerializer(data, many=True).data})

@require_http_methods(["POST"])
@csrf_exempt
def user_logout(request):
    """
    Widok wylogowania użytkownika.

    Wylogowuje użytkownika z systemu.

    :param request: HttpRequest
    :return: JsonResponse z komunikatem o wylogowaniu
    """
    logout(request)
    return JsonResponse({"message": "Logout successfull"})
        
        