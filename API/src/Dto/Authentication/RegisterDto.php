<?php

namespace App\Dto\Authentication;

use Symfony\Component\Validator\Constraints as Assert;

// class RegisterDto
// {
//     private string $username;
//     private string $email;
//     private string $password;

//     public function __construct(string $username, string $email, string $password)
//     {
//         $this->username = $username;
//         $this->email = $email;
//         $this->password = $password;
//     }

//     public function getUsername(): string
//     {
//         return $this->username;
//     }

//     public function getEmail(): string
//     {
//         return $this->email;
//     }

//     public function getPassword(): string
//     {
//         return $this->password;
//     }

//     public function validate(): array
//     {
//         // $errors = [];

//         // if (empty($this->username)) {
//         //     $errors['username'] = 'Username is required.';
//         // }

//         // if (empty($this->email)) {
//         //     $errors['email'] = 'Email is required.';
//         // } elseif (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
//         //     $errors['email'] = 'Invalid email format.';
//         // }

//         // if (empty($this->password)) {
//         //     $errors['password'] = 'Password is required.';
//         // } elseif (strlen($this->password) < 8) {
//         //     $errors['password'] = 'Password must be at least 8 characters long.';
//         // }

//         // return $errors;
//     }
// }

final class RegisterDto
{
    #[Assert\NotBlank]
    #[Assert\Length(min: 4, max: 255)]
    public string $username;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[Assert\Unique(entityClass: 'App\Entity\User', field: 'email')]
    public string $email;

    #[Assert\NotBlank]
    #[Assert\Length(min: 6, max: 255)]
    public string $password;

    public function __construct(string $username, string $email, string $password)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
