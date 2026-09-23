from django.db import models

class Course(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    titleEn = models.CharField(max_length=255, blank=True, null=True)
    titleMr = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    level = models.CharField(max_length=255, blank=True, null=True)
    duration = models.CharField(max_length=255, blank=True, null=True)
    fee = models.CharField(max_length=255, blank=True, null=True)
    data = models.JSONField(blank=True, null=True)
    updatedAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'courses'

class AudioItem(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    titleEn = models.CharField(max_length=255, blank=True, null=True)
    titleMr = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    duration = models.CharField(max_length=255, blank=True, null=True)
    reciter = models.CharField(max_length=255, blank=True, null=True)
    data = models.JSONField(blank=True, null=True)
    updatedAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'audio_items'

class VideoItem(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    titleEn = models.CharField(max_length=255, blank=True, null=True)
    titleMr = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    speaker = models.CharField(max_length=255, blank=True, null=True)
    youtubeId = models.CharField(max_length=255, blank=True, null=True)
    data = models.JSONField(blank=True, null=True)
    updatedAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'video_items'

class GalleryItem(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    titleEn = models.CharField(max_length=255, blank=True, null=True)
    titleMr = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    imageUrl = models.CharField(max_length=1000, blank=True, null=True)
    year = models.CharField(max_length=255, blank=True, null=True)
    data = models.JSONField(blank=True, null=True)
    updatedAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'gallery_items'

class DocumentItem(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    titleEn = models.CharField(max_length=255, blank=True, null=True)
    titleMr = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    pages = models.IntegerField(blank=True, null=True)
    fileSize = models.CharField(max_length=255, blank=True, null=True)
    data = models.JSONField(blank=True, null=True)
    updatedAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'document_items'

class Event(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    titleEn = models.CharField(max_length=255, blank=True, null=True)
    titleMr = models.CharField(max_length=255, blank=True, null=True)
    date = models.CharField(max_length=255, blank=True, null=True)
    time = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    data = models.JSONField(blank=True, null=True)
    updatedAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'events'

class Enrollment(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    studentName = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    courseId = models.CharField(max_length=255, blank=True, null=True)
    courseName = models.CharField(max_length=255, blank=True, null=True)
    age = models.CharField(max_length=255, blank=True, null=True)
    occupation = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    priorSanskritExp = models.TextField(blank=True, null=True)
    batchPreference = models.CharField(max_length=255, blank=True, null=True)
    priorKnowledge = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    createdAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'enrollments'

class Inquiry(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    createdAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'inquiries'

class AdminSetting(models.Model):
    key = models.CharField(max_length=255, primary_key=True)
    value = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'admin_settings'

class Category(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    titleEn = models.CharField(max_length=255, blank=True, null=True)
    titleMr = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    descriptionEn = models.TextField(blank=True, null=True)
    descriptionMr = models.TextField(blank=True, null=True)
    data = models.JSONField(blank=True, null=True)
    updatedAt = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'categories'

