using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public Photo Image 
        { 
            get => this.Photos.FirstOrDefault(x => x.IsMain);
        }
    }
}