from django.db import models
class Price(models.Model):
    crop = models.CharField(max_length = 100)
    district = models.CharField(max_length = 100)
    price = models.IntegerField()
    data_recorded = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.crop} - {self.district}"
    