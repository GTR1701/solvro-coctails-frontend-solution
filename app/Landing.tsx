"use client";
import { Coctail } from "@/types/types";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Filter, FilterIcon, StarIcon } from "lucide-react";
import { getCookie, setCookie } from "cookies-next";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import FavoriteCocktails from "../components/FavoriteCocktails";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { searchFormSchema } from "@/schemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
	cocktails: Coctail[];
};

export default function Landing({ cocktails }: Readonly<Props>) {
	const [cocktailsList, setCocktailsList] = useState<Coctail[]>(cocktails);
	const [reload, setReload] = useState(false);
	const [cocktailName, setCocktailName] = useState("");
	const [cocktailType, setCocktailType] = useState("");
	useEffect(() => {}, [reload]);

	useEffect(() => {
		const url = new URL("https://cocktails.solvro.pl/api/v1/cocktails");
		const params = new URLSearchParams();
		params.append("ingredients", "true");
		cocktailName !== "" ? params.append("name", cocktailName) : null;
		cocktailType !== "" ? params.append("category", cocktailType) : null;

		url.search = params.toString();
		console.log(url.toString());

		const fetchData = async () => {
			const response = await fetch(url.toString());
			const data = await response.json();
			return data.data;
		};
		fetchData().then((data) => setCocktailsList(data));
	}, [cocktailName, cocktailType]);

	const cocktailNameForm = useForm<z.infer<typeof searchFormSchema>>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			name: "",
		},
	});
	const cocktailTypeForm = useForm<z.infer<typeof searchFormSchema>>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			name: "",
		},
	});

	function onNameSubmit(data: z.infer<typeof searchFormSchema>) {
		setCocktailName(data.name);
	}
	function onTypeSubmit(data: z.infer<typeof searchFormSchema>) {
		setCocktailType(data.name);
	}

	const favoriteCocktailsCookie = getCookie("favoriteCocktails");
	const favoriteCocktailsSplit = favoriteCocktailsCookie
		? favoriteCocktailsCookie.split(",")
		: [];
	const favoriteCocktails = cocktailsList.filter((cocktail) =>
		favoriteCocktailsSplit.includes(cocktail.id.toString())
	);

	const addToFavorites = (id: number) => {
		const favoriteCocktails = favoriteCocktailsCookie
			? favoriteCocktailsCookie.split(",")
			: [];
		favoriteCocktails.push(id.toString());
		setCookie("favoriteCocktails", favoriteCocktails.join(","));
		setReload(!reload);
	};

	const removeFromFavorites = (id: number) => {
		const favoriteCocktails = favoriteCocktailsCookie
			? favoriteCocktailsCookie.split(",")
			: [];
		const newFavorites = favoriteCocktails.filter(
			(favorite) => favorite !== id.toString()
		);
		setCookie("favoriteCocktails", newFavorites.join(","));
		setReload(!reload);
	};

	return (
		<div className="w-fit mx-auto">
			<Accordion type="multiple">
				<AccordionItem value="filters" className="border-0">
					<AccordionTrigger className="font-bold no-underline focus:no-underline"><Filter className="transition" />FILTERS</AccordionTrigger>
					<AccordionContent>
						<Accordion type="multiple">
							<AccordionItem value="name" className="border-0">
								<AccordionTrigger className="font-bold no-underline focus:no-underline">
									Filter by Name
								</AccordionTrigger>
								<AccordionContent>
									<Form {...cocktailNameForm}>
										<form
											onSubmit={cocktailNameForm.handleSubmit(
												onNameSubmit
											)}
											className="flex justify-between"
										>
											<FormField
												control={
													cocktailNameForm.control
												}
												name="name"
												render={({ field }) => (
													<FormItem className="w-[75%]">
														<FormControl>
															<Input
																placeholder="Cocktail Name"
																{...field}
																className="border-2 border-primary rounded-md p-1"
															/>
														</FormControl>
													</FormItem>
												)}
											/>
											<Button type="submit" className="w-[20%]">
												Search
											</Button>
										</form>
									</Form>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="type" className="border-0">
								<AccordionTrigger className="font-bold no-underline focus:no-underline">
									Filter by Category
								</AccordionTrigger>
								<AccordionContent>
									<Form {...cocktailNameForm}>
										<form
											onSubmit={cocktailTypeForm.handleSubmit(
												onTypeSubmit
											)}
											className="flex justify-between"
										>
											<FormField
												control={
													cocktailTypeForm.control
												}
												name="name"
												render={({ field }) => (
													<FormItem className="w-[75%]">
														<FormControl>
															<Input
																placeholder="Cocktail Category"
																{...field}
																className="border-2 border-primary rounded-md p-1"
															/>
														</FormControl>
													</FormItem>
												)}
											/>
											<Button type="submit" className="w-[20%]">
												Search
											</Button>
										</form>
									</Form>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			{favoriteCocktailsCookie && (
				<h1 className="text-2xl font-bold text-center mt-2">
					Favorites
				</h1>
			)}
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 mx-auto">
				<FavoriteCocktails favorites={favoriteCocktails} />
			</div>
			<h1 className="text-2xl font-bold text-center mt-2">Coctails</h1>
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 mx-auto">
				{cocktailsList.map((cocktail) => {
					const isFavorite = favoriteCocktailsCookie?.includes(
						cocktail.id.toString()
					);
					return (
						<Dialog key={cocktail.id}>
							<DialogTrigger className="bg-card w-[85%] mx-auto grid my-3 rounded-lg shadow-lg p-3 hover:scale-105 transition active:scale-90">
								<h2 className="font-bold text-lg text-accent ml-4">
									{cocktail.name}
								</h2>
								<Image
									src={cocktail.imageUrl}
									alt={cocktail.name}
									width={500}
									height={500}
									className="w-[80%] mx-auto my-2"
								/>
							</DialogTrigger>
							<DialogContent className="w-[90%] md:h-[90%] lg:h-fit overflow-auto">
								<DialogHeader>
									<DialogTitle className="text-accent text-center">
										{cocktail.name}
									</DialogTitle>
									<DialogDescription>
										<Image
											src={cocktail.imageUrl}
											alt={cocktail.name}
											width={500}
											height={500}
											className="w-[80%] mx-auto my-2"
										/>
										{isFavorite ? (
											<Button
												className="mb-2"
												onClick={() =>
													removeFromFavorites(
														cocktail.id
													)
												}
											>
												Remove from favorites{" "}
												<StarFilledIcon className="ml-1" />
											</Button>
										) : (
											<Button
												className="mb-2"
												onClick={() =>
													addToFavorites(cocktail.id)
												}
											>
												Add to favorites{" "}
												<StarIcon className="ml-1" />
											</Button>
										)}
										<p className="text-lg font-bold text-accent flex">
											Alcocholic:{" "}
											<p className="text-primary font-normal pl-1">
												{cocktail.alcoholic
													? "Yes"
													: "No"}
											</p>
										</p>
										<p className="text-lg font-bold text-accent flex">
											Category:{" "}
											<p className="text-primary font-normal pl-1">
												{cocktail.category}
											</p>
										</p>
										<p className="text-lg font-bold text-accent flex">
											Glass:{" "}
											<p className="text-primary font-normal pl-1">
												{cocktail.glass}
											</p>
										</p>
										<p className="text-lg font-bold text-accent text-left">
											Ingredients:
										</p>
										<ul className="text-primary text-left">
											{cocktail.ingredients.map(
												(ingredient) => (
													<li
														key={ingredient.id}
														className="list-disc ml-10"
													>
														{ingredient.name} -{" "}
														{ingredient.measure}
													</li>
												)
											)}
										</ul>
										<p className="text-lg font-bold text-accent text-left">
											How to prepare:
										</p>
										<p className="text-primary text-left">
											{cocktail.instructions}
										</p>
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					);
				})}
			</div>
		</div>
	);
}
