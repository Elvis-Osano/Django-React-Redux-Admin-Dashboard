from django.db import models

# Create your models here.
class Branch(models.Model):
    name= models.CharField(max_length=100)
    sale= models.TextField()
    created=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Branches"

    def __str__(self):
        return self.name