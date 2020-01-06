using Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Infrastructure.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            
            if (file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    uploadResult = _cloudinary.Upload(new ImageUploadParams 
                    {
                        File = new FileDescription(file.FileName, stream)
                    });
                }
            }

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUri.AbsoluteUri
            };
        }

        public string DeletePhoto(string publicId)
        {
            throw new System.NotImplementedException();
        }
    }
}