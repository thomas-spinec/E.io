<?php

namespace App\Dto\Authentication;


use Symfony\Component\Validator\Constraints as Assert;

final class RegisterDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 4, max: 255)]
        public string $username,

        #[Assert\NotBlank]
        #[Assert\Email]
        public string $email,

        #[Assert\NotBlank]
        #[Assert\Length(min: 6, max: 255)]
        public string $password
    ) {
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
