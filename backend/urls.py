"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from django.http import HttpResponse, FileResponse
from django.conf import settings

def serve_spa(request):
    dist_index = os.path.join(settings.BASE_DIR, 'dist', 'index.html')
    if os.path.exists(dist_index):
        return FileResponse(open(dist_index, 'rb'), content_type='text/html')
    return HttpResponse("<h2>Surawanee Backend API is running.</h2><p>Vite frontend running on dev port or run 'npm run build'.</p>")

def serve_public(request, path):
    # Try dist/ first, then public/
    dist_file = os.path.join(settings.BASE_DIR, 'dist', path)
    if os.path.exists(dist_file):
        return serve(request, path, document_root=os.path.join(settings.BASE_DIR, 'dist'))
    pub_file = os.path.join(settings.BASE_DIR, 'public', path)
    if os.path.exists(pub_file):
        return serve(request, path, document_root=os.path.join(settings.BASE_DIR, 'public'))
    return serve_spa(request)

def serve_uploads(request, path):
    pub_file = os.path.join(settings.BASE_DIR, 'public', 'uploads', path)
    if os.path.exists(pub_file):
        return serve(request, path, document_root=os.path.join(settings.BASE_DIR, 'public', 'uploads'))
    dist_file = os.path.join(settings.BASE_DIR, 'dist', 'uploads', path)
    if os.path.exists(dist_file):
        return serve(request, path, document_root=os.path.join(settings.BASE_DIR, 'dist', 'uploads'))
    return HttpResponse("File not found", status=404)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': os.path.join(settings.BASE_DIR, 'dist', 'assets')}),
    re_path(r'^uploads/(?P<path>.*)$', serve_uploads),
    re_path(r'^(?P<path>[^/]+\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp3|pdf|txt|json))$', serve_public),
    re_path(r'^(?!api|admin).*$', serve_spa),
]
