<?php

namespace App\Controller;

use App\Entity\User;
use App\Dto\Authentication\RegisterDto;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{


    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(
        #[MapRequestPayload(
            // RegisterDto::class,
            acceptFormat: 'json',
            validationFailedStatusCode: 400,
        )] RegisterDto $dto,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager,
    ): Response {

        // s'il y a une erreur de validation, on la renvoie

        $user = new User();
        $user->setUsername($dto->getUsername());
        $user->setEmail($dto->getEmail());
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $dto->getPassword()
            )
        );

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($user, 201);
    }
}
