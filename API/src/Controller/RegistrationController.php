<?php

namespace App\Controller;

use App\Entity\User;
use App\Dto\Authentication\RegisterDto;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{

    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {

        // register with the request from the front (react)
        $data = json_decode($request->getContent(), true);

        $registerDto = new RegisterDto(
            $data['username'] ?? null,
            $data['email'] ?? null,
            $data['password'] ?? null
        );

        $errors = $this->validator->validate($registerDto);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $user = new User();
        $user->setUsername($registerDto->getUsername());
        $user->setEmail($registerDto->getEmail());
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $registerDto->getPassword()
            )
        );

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($user, 201);


        // $form = $this->createForm(RegistrationFormType::class, $user);
        // $form->handleRequest($request);

        // if ($form->isSubmitted() && $form->isValid()) {
        //     // encode the plain password
        //     $user->setPassword(
        //         $userPasswordHasher->hashPassword(
        //             $user,
        //             $form->get('plainPassword')->getData()
        //         )
        //     );

        //     $entityManager->persist($user);
        //     $entityManager->flush();

        //     // do anything else you need here, like send an email

        //     return $this->redirectToRoute('_profiler_home');
        // }

        // return $this->render('registration/register.html.twig', [
        //     'registrationForm' => $form,
        // ]);
    }
}
