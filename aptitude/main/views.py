from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import OtherDetails
import json

# This view checks if the user is authenticated
@csrf_exempt
def check_session(request):
    print(request.user)
    if request.user.is_authenticated:
        # If the user is authenticated, return relevant information
        return JsonResponse({"isAuthenticated": True, "username": request.user.username})
    else:
        # If the user is not authenticated, return that information
        return JsonResponse({"isAuthenticated": False})

# This view handles the login process
@csrf_exempt
def login_check(request):
    if request.method == "POST":
        # Assuming login data is sent as JSON
        login_data = json.loads(request.body.decode('utf-8'))
        username = login_data.get('email')
        password = login_data.get('password')
        # Authenticate user
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
        
            print("Before login:", request.user)
            print("Request object before login:", request)
            login(request, user)
            print("After login:", request.user)
            print("Request object after login:", request)
            return JsonResponse({"message":"Authentication Successful"}, status=200)
        else:
            # If authentication failed, return an error message
            return JsonResponse({"message":"Invalid Credentials"}, status=401)
    else:
        # If the request method is not POST, return an error message
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        department = data.get('department')
        branch = data.get('branch')
        # Check if the user already exists
        if User.objects.filter(username=email).exists():
            return JsonResponse({'status':'failure','message': 'User already exists'},status=409)
        else:
            # If the user does not exist, create a new user
            user = User.objects.create_user(username=email, email=email, password=password)
            # Create student details
            student = OtherDetails.objects.create(user=user, name=name, branch=department, year=branch)
            return JsonResponse({"message": "Sign up successful!"}, status=200)
    else:
        # If the request method is not POST, return an error message
        return JsonResponse({"error": "Method not allowed"}, status=405)
