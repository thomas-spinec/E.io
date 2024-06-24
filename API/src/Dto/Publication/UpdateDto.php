<?php

namespace App\Dto\Publication;

use Symfony\Component\Validator\Constraints as Assert;

final class UpdateDto
{
    #[Assert\NotBlank]
    #[Assert\Length(min: 1, max: 255)]
    public ?string $content;
}