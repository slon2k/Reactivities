using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(u => u.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(u => u.UserName, o => o.MapFrom(s => s.AppUser.UserName));
        }
    }
}