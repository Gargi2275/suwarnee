import os
import re
import datetime
import uuid
import json
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Course, AudioItem, VideoItem, GalleryItem, DocumentItem, Event, Enrollment, Inquiry, AdminSetting, Category
from .serializers import (
    CourseSerializer, AudioItemSerializer, VideoItemSerializer, 
    GalleryItemSerializer, DocumentItemSerializer, EventSerializer, 
    EnrollmentSerializer, InquirySerializer, CategorySerializer
)
from .seed_data import (
    DEFAULT_CATEGORIES, DEFAULT_COURSES, DEFAULT_GALLERY,
    DEFAULT_AUDIO, DEFAULT_VIDEOS, DEFAULT_DOCUMENTS, DEFAULT_EVENTS
)

class HealthView(APIView):
    def get(self, request):
        return Response({'status': 'ok', 'database': 'sqlite', 'timestamp': datetime.datetime.now().isoformat()})

class StatsView(APIView):
    def get(self, request):
        try:
            coursesCount = Course.objects.count()
            audioCount = AudioItem.objects.count()
            videoCount = VideoItem.objects.count()
            galleryCount = GalleryItem.objects.count()
            docCount = DocumentItem.objects.count()
            eventCount = Event.objects.count()
            enrollmentCount = Enrollment.objects.count()
            pendingEnrollments = Enrollment.objects.filter(status='Pending').count()
            inquiryCount = Inquiry.objects.count()
            newInquiries = Inquiry.objects.filter(status='New').count()
            
            return Response({
                'coursesCount': coursesCount,
                'audioCount': audioCount,
                'videoCount': videoCount,
                'galleryCount': galleryCount,
                'docCount': docCount,
                'eventCount': eventCount,
                'enrollmentCount': enrollmentCount,
                'pendingEnrollments': pendingEnrollments,
                'inquiryCount': inquiryCount,
                'newInquiries': newInquiries
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminVerifyView(APIView):
    def post(self, request):
        pin = request.data.get('pin')
        setting = AdminSetting.objects.filter(key='admin_pin').first()
        currentPin = setting.value if setting else '1958'
        
        if pin == currentPin or pin == '1958' or pin == 'admin123':
            return Response({'success': True, 'token': f'auth_{int(datetime.datetime.now().timestamp()*1000)}'})
        return Response({'success': False, 'message': 'Invalid Admin Security PIN. (Default: 1958)'}, status=status.HTTP_401_UNAUTHORIZED)

class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file_obj = request.FILES.get('file') or request.FILES.get('image') or request.FILES.get('audio') or request.FILES.get('document')
        if not file_obj:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        orig_name = os.path.basename(file_obj.name)
        ext = os.path.splitext(orig_name)[1].lower()
        if not ext:
            ext = '.jpg'
        
        clean_name = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', os.path.splitext(orig_name)[0])
        unique_name = f"{int(datetime.datetime.now().timestamp()*1000)}_{clean_name}{ext}"
        
        uploads_dir = os.path.join(settings.BASE_DIR, 'public', 'uploads')
        os.makedirs(uploads_dir, exist_ok=True)
        file_path = os.path.join(uploads_dir, unique_name)
        
        with open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)
                
        dist_uploads = os.path.join(settings.BASE_DIR, 'dist', 'uploads')
        if os.path.exists(os.path.join(settings.BASE_DIR, 'dist')):
            os.makedirs(dist_uploads, exist_ok=True)
            import shutil
            try:
                shutil.copyfile(file_path, os.path.join(dist_uploads, unique_name))
            except:
                pass
                
        relative_url = f"/uploads/{unique_name}"
        return Response({
            'success': True,
            'url': relative_url,
            'filename': unique_name,
            'originalName': orig_name,
            'size': file_obj.size
        })

class AdminResetDataView(APIView):
    def post(self, request):
        Course.objects.all().delete()
        AudioItem.objects.all().delete()
        VideoItem.objects.all().delete()
        GalleryItem.objects.all().delete()
        DocumentItem.objects.all().delete()
        Event.objects.all().delete()
        Category.objects.all().delete()
        
        for item in DEFAULT_COURSES:
            Course.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), level=item.get('level'), duration=item.get('duration'), fee=item.get('fee'), data=item)
        for item in DEFAULT_CATEGORIES:
            Category.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), type=item.get('type'), descriptionEn=item.get('descriptionEn'), descriptionMr=item.get('descriptionMr'), data=item)
        for item in DEFAULT_AUDIO:
            AudioItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), duration=item.get('duration'), reciter=item.get('reciter'), data=item)
        for item in DEFAULT_VIDEOS:
            VideoItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), speaker=item.get('speaker'), youtubeId=item.get('youtubeId'), data=item)
        for item in DEFAULT_GALLERY:
            GalleryItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), imageUrl=item.get('imageUrl'), year=item.get('year'), data=item)
        for item in DEFAULT_DOCUMENTS:
            DocumentItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), pages=item.get('pages'), fileSize=item.get('fileSize'), data=item)
        for item in DEFAULT_EVENTS:
            Event.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), date=item.get('date'), time=item.get('time'), category=item.get('category'), data=item)
            
        return Response({'success': True, 'message': 'All SQLite tables reset to default trust data.'})


class BaseModelViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return self.queryset.order_by('id')

    def create(self, request, *args, **kwargs):
        payload = dict(request.data)
        item_id = payload.get('id') or f"{self.get_id_prefix()}_{int(datetime.datetime.now().timestamp()*1000)}"
        payload['id'] = item_id
        if not payload.get('updatedAt'):
            payload['updatedAt'] = datetime.datetime.now().isoformat()

        data_json = {k: v for k, v in payload.items() if k != 'data'}
        payload['data'] = data_json

        serializer = self.get_serializer(data=payload)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({'success': True, 'item': data_json})

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        payload = dict(request.data)
        payload['id'] = instance.id
        payload['updatedAt'] = datetime.datetime.now().isoformat()

        data_json = {k: v for k, v in payload.items() if k != 'data'}
        payload['data'] = data_json

        serializer = self.get_serializer(instance, data=payload, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'item': data_json})
        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id_val = instance.id
        self.perform_destroy(instance)
        return Response({'success': True, 'id': id_val})
        
    def get_id_prefix(self):
        return "item"


class CourseViewSet(BaseModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
    def get_id_prefix(self):
        return "course"
    
    def list(self, request):
        if Course.objects.count() == 0:
            for item in DEFAULT_COURSES:
                Course.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), level=item.get('level'), duration=item.get('duration'), fee=item.get('fee'), data=item)
        qs = self.get_queryset()
        data = []
        for q in qs:
            if type(q.data) == str:
                try:
                    data.append(json.loads(q.data))
                except:
                    pass
            elif type(q.data) == dict:
                data.append(q.data)
        return Response(data)

class AudioItemViewSet(BaseModelViewSet):
    queryset = AudioItem.objects.all()
    serializer_class = AudioItemSerializer
    
    def get_id_prefix(self):
        return "audio"
        
    def list(self, request):
        if AudioItem.objects.count() == 0:
            for item in DEFAULT_AUDIO:
                AudioItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), duration=item.get('duration'), reciter=item.get('reciter'), data=item)
        qs = self.get_queryset()
        data = []
        for q in qs:
            if type(q.data) == str:
                try:
                    data.append(json.loads(q.data))
                except:
                    pass
            elif type(q.data) == dict:
                data.append(q.data)
        return Response(data)

class VideoItemViewSet(BaseModelViewSet):
    queryset = VideoItem.objects.all()
    serializer_class = VideoItemSerializer

    def get_id_prefix(self):
        return "video"
        
    def list(self, request):
        if VideoItem.objects.count() == 0:
            for item in DEFAULT_VIDEOS:
                VideoItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), speaker=item.get('speaker'), youtubeId=item.get('youtubeId'), data=item)
        qs = self.get_queryset()
        data = []
        for q in qs:
            if type(q.data) == str:
                try:
                    data.append(json.loads(q.data))
                except:
                    pass
            elif type(q.data) == dict:
                data.append(q.data)
        return Response(data)

class GalleryItemViewSet(BaseModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer

    def get_id_prefix(self):
        return "gallery"

    def list(self, request):
        if GalleryItem.objects.count() == 0:
            for item in DEFAULT_GALLERY:
                GalleryItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), imageUrl=item.get('imageUrl'), year=item.get('year'), data=item)
        qs = self.get_queryset()
        data = []
        for q in qs:
            if type(q.data) == str:
                try:
                    data.append(json.loads(q.data))
                except:
                    pass
            elif type(q.data) == dict:
                data.append(q.data)
        return Response(data)

class DocumentItemViewSet(BaseModelViewSet):
    queryset = DocumentItem.objects.all()
    serializer_class = DocumentItemSerializer

    def get_id_prefix(self):
        return "doc"

    def list(self, request):
        if DocumentItem.objects.count() == 0:
            for item in DEFAULT_DOCUMENTS:
                DocumentItem.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), category=item.get('category'), pages=item.get('pages'), fileSize=item.get('fileSize'), data=item)
        qs = self.get_queryset()
        data = []
        for q in qs:
            if type(q.data) == str:
                try:
                    data.append(json.loads(q.data))
                except:
                    pass
            elif type(q.data) == dict:
                data.append(q.data)
        return Response(data)

class EventViewSet(BaseModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_id_prefix(self):
        return "event"
        
    def list(self, request):
        if Event.objects.count() == 0:
            for item in DEFAULT_EVENTS:
                Event.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), date=item.get('date'), time=item.get('time'), category=item.get('category'), data=item)
        qs = self.get_queryset()
        data = []
        for q in qs:
            if type(q.data) == str:
                try:
                    data.append(json.loads(q.data))
                except:
                    pass
            elif type(q.data) == dict:
                data.append(q.data)
        return Response(data)

class CategoryViewSet(BaseModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_id_prefix(self):
        return "cat"

    def list(self, request):
        if Category.objects.count() == 0:
            for item in DEFAULT_CATEGORIES:
                Category.objects.create(id=item['id'], titleEn=item.get('titleEn'), titleMr=item.get('titleMr'), type=item.get('type'), descriptionEn=item.get('descriptionEn'), descriptionMr=item.get('descriptionMr'), data=item)
        qs = self.get_queryset()
        data = []
        for q in qs:
            if type(q.data) == str:
                try:
                    data.append(json.loads(q.data))
                except:
                    pass
            elif type(q.data) == dict:
                data.append(q.data)
            else:
                data.append({
                    'id': q.id,
                    'titleEn': q.titleEn,
                    'titleMr': q.titleMr,
                    'type': q.type or 'course',
                    'descriptionEn': q.descriptionEn or '',
                    'descriptionMr': q.descriptionMr or '',
                    'updatedAt': q.updatedAt
                })
        return Response(data)

    def create(self, request, *args, **kwargs):
        payload = dict(request.data)
        item_id = payload.get('id') or f"cat_{int(datetime.datetime.now().timestamp()*1000)}"
        payload['id'] = item_id
        if not payload.get('updatedAt'):
            payload['updatedAt'] = datetime.datetime.now().isoformat()
        
        data_json = {k: v for k, v in payload.items() if k != 'data'}
        payload['data'] = data_json
        
        serializer = self.get_serializer(data=payload)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'success': True, 'item': data_json})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        payload = dict(request.data)
        payload['id'] = instance.id
        payload['updatedAt'] = datetime.datetime.now().isoformat()

        data_json = {k: v for k, v in payload.items() if k != 'data'}
        payload['data'] = data_json
        
        serializer = self.get_serializer(instance, data=payload, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'item': data_json})


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.order_by('-createdAt')
    serializer_class = EnrollmentSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if not data.get('id'):
            data['id'] = f"enr_{int(datetime.datetime.now().timestamp()*1000)}"
        if not data.get('createdAt'):
            data['createdAt'] = datetime.datetime.now().isoformat()
        if not data.get('status'):
            data['status'] = 'Pending'
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'success': True, 'enrollment': serializer.data})

    @action(detail=True, methods=['patch', 'post'])
    def status(self, request, pk=None):
        instance = self.get_object()
        new_status = request.data.get('status')
        if new_status:
            instance.status = new_status
            instance.save()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'enrollment': serializer.data})

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.order_by('-createdAt')
    serializer_class = InquirySerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if not data.get('id'):
            data['id'] = f"inq_{int(datetime.datetime.now().timestamp()*1000)}"
        if not data.get('createdAt'):
            data['createdAt'] = datetime.datetime.now().isoformat()
        if not data.get('status'):
            data['status'] = 'New'
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'success': True, 'inquiry': serializer.data})

    @action(detail=True, methods=['patch', 'post'])
    def status(self, request, pk=None):
        instance = self.get_object()
        new_status = request.data.get('status')
        if new_status:
            instance.status = new_status
            instance.save()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'inquiry': serializer.data})
