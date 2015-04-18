<?php
    include('Hprose.php');

    define("SEX_UNKNOWN", 0);
    define("SEX_MALE", 1);
    define("SEX_FEMALE", 2);
    define("SEX_INTERSEX", 3);

    class User {
        var $name;
        var $sex;
        var $birthday;
        var $age;
        var $married;
        function __constructor() {}
        static function newUser($name, $sex, $birthday, $age, $married) {
            $user = new self();
            $user->name = $name;
            $user->sex = $sex;
            $user->birthday = $birthday;
            $user->age = $age;
            $user->married = $married;
            return $user;
        }
    }

    function hello($name) {
        return 'Hello ' . $name;
    }

    function sum() {
        $args = func_get_args();
        $sum = 0;
        foreach ($args as $i) {
            $sum += $i;
        }
        return $sum;
    }

    function swapKeyAndValue(&$trans) {
        $trans = array_flip($trans);
        return $trans;
    }

    function getUserList() {
        $userlist = array(
            User::newUser("Amy", SEX_FEMALE, new DateTime("1983-12-03"), 26, true),
            User::newUser("Bob", SEX_MALE, new DateTime("1989-06-12"), 20, false),
            User::newUser("Chris", SEX_UNKNOWN, new DateTime("1980-03-08"), 29, true),
            User::newUser("Alex", SEX_INTERSEX, new DateTime("1992-06-14"), 17, false)
        );
        return $userlist;
    }

    function swap($a, $b) {
        return array($b, $a);
    }

    $server = new HproseHttpServer();
    $server->addFunction('hello');
    $server->addFunction('sum');
    $server->addFunction('swapKeyAndValue');
    $server->addFunction('getUserList');
    $server->addFunction('swap');
    $server->addFunction('print_r');
    $server->addFilter(new HproseJSONRPCServiceFilter());
    $server->addFilter(new HproseXMLRPCServiceFilter());
    $server->setDebugEnabled(true);
    $server->setCrossDomainEnabled(true);
    $server->setP3PEnabled(true);
    $server->start();
