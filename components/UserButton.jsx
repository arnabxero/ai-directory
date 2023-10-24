'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Edit, Cog } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UpdateProfile from '@/components/UpdateProfile';


const UserButton = ({ UserData }) => {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        window.location.reload();
    };

    const [User, setUser] = useState(null);

    if (UserData && !User) {
        setUser(JSON.parse(UserData));
    }
    // const User = JSON.parse(UserData);

    return (
        <div className='mr-5 mt-0.5'>
            {User ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="cursor-pointer border-2 py-1.5 px-2.5 rounded-lg border-[#EAEAEA] hover:bg-black hover:text-white transition-all duration-300">
                            {User?.username.charAt(0).toUpperCase()}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-50">
                        <div className="grid gap-4 text-center">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                    {User?.username}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {User?.email}
                                </p>
                            </div>
                            <hr />
                            {User?.role === 'admin' && (
                                <Link href={`/admin`}>
                                    <Button
                                        className="w-full"
                                        variant="destructive">
                                        Admin Panel<Cog className='pl-2' />
                                    </Button>
                                </Link>
                            )}
                            <Dialog>
                                <DialogTrigger>
                                    <Button
                                        className="w-full"
                                        variant="ghost">
                                        Edit Profile<Edit className='pl-2' />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className='text-center'>Update Your Info</DialogTitle>
                                        <hr />
                                        <DialogDescription>
                                            <UpdateProfile userData={User} />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>


                            <Button
                                onClick={handleLogout}
                                className="w-full"
                                variant="ghost">
                                Log Out<LogOut className='pl-2' />
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            ) : (
                <a href='/login'><button className='border-2 py-1.5 px-2.5 rounded-md border-[#EAEAEA] hover:bg-black hover:text-white transition-all duration-300'>Login</button></a>
            )}

        </div>
    );
};

export default UserButton;
