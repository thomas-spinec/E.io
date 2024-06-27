<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class ApiSecurityController extends AbstractController
{
    #[Route('/loginApi', name: 'loginApi', methods: ['POST'])]
    public function index(
        #[CurrentUser] ?User $user
    ): Response {
        if (null === $user) {
            return $this->json([
                'message' => 'Missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'user' => $user,
        ]);
    }
}
