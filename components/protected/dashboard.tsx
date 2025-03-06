"use client";
import useProfileQuery from "@/hooks/use-profile-query";
import useSupabase from "@/hooks/use-supabase";
import { profileAtom } from "@/utils/atoms/atoms";
import { authUserAtom } from "@/utils/atoms/authAtoms";
import type { User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface DashboardProps {
	user: User;
}

export default function Dashboard({ user }: DashboardProps) {
	const supabase = useSupabase();
	const [authUser, setAuthUser] = useAtom(authUserAtom);
	const [profile, setProfile] = useAtom(profileAtom);

	useEffect(() => {
		setAuthUser(user);
	}, [user, setAuthUser]);

	if (!user) {
		redirect("/sign-in");
	}

	const {
		data: profileData,
		isLoading,
		isError,
		error,
	} = useQuery(
		useProfileQuery({
			userUuid: authUser?.id ?? "",
			client: supabase,
		}),
	);

	useEffect(() => {
		if (profileData !== undefined) {
			setProfile(profileData);
		}
	}, [profileData, setProfile]);

	return (
		<div className="flex justify-center w-full">
			<div className="flex-1 max-w-2xl w-full flex flex-col gap-12 items-start ml-8 md:ml-16">
				fsdfasd
				<div className="w-full">
					<div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
						<InfoIcon size="16" strokeWidth={2} />
						page This is a protected page that you can only see as an
						authenticated user
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-2xl mb-4">Your user details</h2>
					<pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
						{JSON.stringify(authUser, null, 2)}
					</pre>
					<pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
						{isLoading ? "loading" : JSON.stringify(profile, null, 2)}
					</pre>
				</div>
			</div>
		</div>
	);
}
