interface CardProps extends CardItem {
  selected: boolean;
  onClick: () => void;
}

export default function Card({name,photo,selected,onClick,}: CardProps) {
    const selectedStyle =
      selected
        ? "ring-4 ring-primary scale-[1.02]"
        : "hover:scale-[1.02]"
        
    return (
        <button
          type="button"
          onClick={onClick}
          className={`
            group relative h-56 w-full overflow-hidden rounded-3xl
            transition-all duration-300 cursor-pointer
            ${selectedStyle}
          `}
        >
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-xl">
              {name}
            </h2>
          </div>

          {selected && (
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              ✓
            </div>
          )}
        </button>
    );
}