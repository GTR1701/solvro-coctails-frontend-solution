"use client"
import { Coctail } from "@/types/types";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";
import { getCookie, setCookie } from "cookies-next";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type Props = {
	cocktails: Coctail[];
};

export default function AllCocktails({ cocktails }: Readonly<Props>) {
    const [reload, setReload] = useState(false)
    useEffect(() => {
      
    }, [reload])
    
	const favoriteCocktailsCookie = getCookie("favoriteCocktails");
    const addToFavorites = (id: number) => {
        const favoriteCocktails = favoriteCocktailsCookie ? favoriteCocktailsCookie.split(",") : [];
        favoriteCocktails.push(id.toString());
        setCookie("favoriteCocktails", favoriteCocktails.join(","));
        setReload(!reload)
    }
    const removeFromFavorites = (id: number) => {
        const favoriteCocktails = favoriteCocktailsCookie ? favoriteCocktailsCookie.split(",") : [];
        const newFavorites = favoriteCocktails.filter((favorite) => favorite !== id.toString());
        setCookie("favoriteCocktails", newFavorites.join(","));
        setReload(!reload)
    }
	return (
		<div className="w-fit mx-auto">
			<h1 className="text-2xl font-bold text-center mt-2">Coctails</h1>
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 mx-auto">
				{cocktails.map((cocktail) => {
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
											<Button className="mb-2" onClick={() => removeFromFavorites(cocktail.id)}>
												Remove from favorites{" "}
												<StarFilledIcon className="ml-1" />
											</Button>
										) : (
											<Button className="mb-2" onClick={() => addToFavorites(cocktail.id)}>
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
                                            {cocktail.ingredients.map((ingredient) => (
                                                <li key={ingredient.id} className="list-disc ml-10">
                                                    {ingredient.name} - {ingredient.measure}
                                                </li>
                                            ))}
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
