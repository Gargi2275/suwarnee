from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HealthView, StatsView, AdminVerifyView, AdminResetDataView, FileUploadView,
    CourseViewSet, AudioItemViewSet, VideoItemViewSet, GalleryItemViewSet,
    DocumentItemViewSet, EventViewSet, EnrollmentViewSet, InquiryViewSet, CategoryViewSet
)

router = DefaultRouter(trailing_slash=False)
router.register(r'categories', CategoryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'audio', AudioItemViewSet)
router.register(r'video', VideoItemViewSet)
router.register(r'gallery', GalleryItemViewSet)
router.register(r'documents', DocumentItemViewSet)
router.register(r'events', EventViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'inquiries', InquiryViewSet)

urlpatterns = [
    path('health', HealthView.as_view()),
    path('stats', StatsView.as_view()),
    path('upload', FileUploadView.as_view()),
    path('admin/verify', AdminVerifyView.as_view()),
    path('admin/reset-data', AdminResetDataView.as_view()),
    path('', include(router.urls)),
]
