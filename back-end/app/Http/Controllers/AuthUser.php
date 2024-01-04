<?php

namespace  App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthUser extends Controller
{
    function authData(Request $request)
    {
        $user = $request->input("user");
        $password = $request->input("password");
        if ($data = $this->userQuery($user, $password)) {
            return response()->json(['Authenticated' => true, 'msg' => 'User is Authenticated', 'data' => $request, 'userData' => $data]);
        } else {
            return response()->json(['Authenticated' => false, 'msg' => 'Login Failed', 'data' => $request]);
        }
    }
    function userQuery($user, $password)
    {
        $user = User::where(function ($query) use ($user) {
            $query->where('name', $user)
                ->orWhere('email', $user);
        })->where('password', $password)->first();

        return $user;
    }
}
