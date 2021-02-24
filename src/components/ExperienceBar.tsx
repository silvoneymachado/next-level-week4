
interface ExperienceProps {
    experience: string;
}
export function ExperienceBar(props: ExperienceProps) {
    const minValue = 0;
    const maxValue = 600;
    return (
        <header className='experience-bar'>
            <span>{minValue}xp</span>
            <div>
                <div style={{ width: `${Number(props.experience) / maxValue * 100}%`}}></div>
                <span className='currentExperience' style={{ left: `${Number(props.experience) / maxValue * 100}%`}}>
                    {props.experience}xp
                </span>
            </div>
            <span>{maxValue}xp</span>
        </header>
    )
}

// #rumoaoproximonivel