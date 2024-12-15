package project.backend.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import project.backend.dtos.SignUpDto;
import project.backend.dtos.UserDto;
import project.backend.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);


    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
