import SearchContext from "../authAndContext/searchProvider";
import HorizontalCard from "../components/HorizontalCard";
import VerticalCard from "../components/VerticalCard";
import SearchSideBar from "../components/SearchSideBar"
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar"
import SortToolbar from "../components/SortToolbar";

export default function SearchPage() {
	const { searchResults, grid } = useContext(SearchContext)
	return (
		<>
			<Navbar />
			<main className="container mx-auto lg:max-w-[90%] flex flex-wrap md:flex-nowrap mt-4 md:min-h-[100vh] overflow-show">
				<SearchSideBar />
				<div className="w-full mt-3">
					<SortToolbar />
					<div className={grid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5' : ''}>
						{searchResults && searchResults.length !== 0 && !grid && searchResults.map((result) => (
							<HorizontalCard
								image={result.image}
								title={result.title}
								price={result.price.toLocaleString()}
								location={result.location}
								description={result.description}
								status={{ id: result?.status_id ?? 1, type: result.status?.type ?? '' }}
								postID={result.id}
								date={result.created_at}
								distance={result.distance}
								key={result.id}
							/>
						))}
						{searchResults && searchResults.length !== 0 && grid && searchResults.map((result) => (
							<VerticalCard
								image={result.image}
								title={result.title}
								price={result.price.toLocaleString()}
								location={result.location}
								description={result.description}
								postID={result.id}
								distance={result.distance}
								key={result.id}
							/>
						))}
						{!searchResults || (searchResults && searchResults.length === 0) && [1].map((key) => (
							<div key={key} className="m-3 p-3 space-x-3 flex group max-h-40 lg:max-h-72 overflow-hidden">
								<div className="max-w-xl mx-auto sm:px-6 lg:px-8">
								<div className="flex items-center pt-8 sm:justify-start sm:pt-0">

									<div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">No Results</div>
								</div>
							</div>
							</div>

							
						))}
					</div>
				</div>
			</main>
		</>
	);
}