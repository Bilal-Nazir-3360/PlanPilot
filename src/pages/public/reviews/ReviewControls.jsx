import { Search, X } from 'lucide-react'

export default function ReviewControls({ sortMode, setSortMode, rating, setRating, search, setSearch, clearFilters, total, shown }) {
  return <section className="review-controls" aria-label="Review controls">
    <div className="review-control-row"><label className="review-sort">Sort<select value={sortMode} onChange={(event)=>setSortMode(event.target.value)}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="highest">Highest rated</option><option value="lowest">Lowest rated</option></select></label><div className="rating-chips" role="group" aria-label="Filter by rating">{['all',5,4,3,2,1].map((value)=><button type="button" className={String(rating)===String(value)?'active':''} key={value} onClick={()=>setRating(String(value))}>{value==='all'?'All':`${value} stars`}</button>)}</div></div>
    <div className="review-control-row"><label className="review-search"><Search size={17}/><span className="sr-only">Search reviews</span><input value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Search name or review" /></label><button className="clear-filters" type="button" onClick={clearFilters}><X size={15}/> Clear filters</button></div>
    <p className="review-count" aria-live="polite">Showing {shown} of {total} reviews</p>
  </section>
}
