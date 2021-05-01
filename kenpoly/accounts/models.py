from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self,email,password=None,**extrafields):
        if not email:
            raise ValueError("Users must have an email address")
        
        email=self.normalize_email(email)
        user=self.model(email=email,**extrafields)

        user.set_password(password)
        user.save()
        

        return user
    def create_superuser(self, email,password,**extrafields):
        account = self.create_user(email, password,**extrafields)

        account.is_admin = True
        account.is_staff = True
        account.is_superuser = True

        account.save()

        return account


class UserAccount(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField( max_length=254,unique=True)
    
    first_name=models.CharField( max_length=50)
    last_name=models.CharField( max_length=50)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=True)
    
    

    objects=UserAccountManager()
    
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=['first_name',"last_name"]

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email