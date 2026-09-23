from rest_framework import serializers
from .models import Course, AudioItem, VideoItem, GalleryItem, DocumentItem, Event, Enrollment, Inquiry, AdminSetting, Category
import json

class JSONParsingSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Parse data back to dict if it's a string, because SQLite might store JSONField as string
        if isinstance(ret.get('data'), str):
            try:
                ret['data'] = json.loads(ret['data'])
            except:
                pass
        return ret

class CategorySerializer(JSONParsingSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CourseSerializer(JSONParsingSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class AudioItemSerializer(JSONParsingSerializer):
    class Meta:
        model = AudioItem
        fields = '__all__'

class VideoItemSerializer(JSONParsingSerializer):
    class Meta:
        model = VideoItem
        fields = '__all__'

class GalleryItemSerializer(JSONParsingSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'

class DocumentItemSerializer(JSONParsingSerializer):
    class Meta:
        model = DocumentItem
        fields = '__all__'

class EventSerializer(JSONParsingSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'

class AdminSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminSetting
        fields = '__all__'
