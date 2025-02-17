import React, { useState } from "react";


export default function InputSlider({
  label,
  min,
  max,
  value,
  units,
  shorthandUnits,
  marks,
  step=1,
  showFill=false,
  size='medium',
  width='w-full',
  showSideInput=true,
  onChange,
  styles = "",
  ...props
}) {
    //todo: remove this
    const [currentValue, setCurrentValue] = useState(value);

    //todo: create thumb styles with a few different options, no way to control thumb style without direct CSS
    const thumbStyleCSS = ``;

    //todo: create slider styles with a few different options, no way to control all aspects of slider style without direct CSS
    const sliderStyleCSS = ``;

    //todo: implement
    const tickMarkSizes = {
        small: '',
        medium: '',
        large: ''
    };

    //todo: implement
    const thumbInputSizes = {
        small: '',
        medium: '',
        large: ''
    }

    //todo: make this variable based on a thumb size
    const thumbWidth = 16; //pixels

    const handleInputChange = (newValue) => {
        if (newValue < min) newValue = min;
        if (newValue > max) newValue = max;
        setCurrentValue(newValue);
        if (onChange) onChange(newValue);
    };

    const handleDrag = (e) => {
        const newValue = Number(e.target.value);
        handleInputChange(newValue);
    };

    const handleChange = (e) => {
        var newValue = Number(e.target.value);
        handleInputChange(newValue);
    };

    if (marks) {
        for ( let i = 0; i < marks?.length; i++) {
            let val = marks[i];
            let cssStyle = `calc(${((val - min) / (max - min)) * 100}% + ${(-((val - min) / (max - min))*8) + thumbWidth/2}px)`
            //console.log(cssStyle);
        }
    }


    const TickMark = ({mark, displayValue=true}) => {
        return (
            <div
                className="absolute -top-2 w-[1px] h-4 bg-gray-400"
                style={{ left: generateLeftOffsetString(mark) }}
            >
                { displayValue && <p className="absolute text-center text-xs top-2 -translate-x-1/2 translate-y-full whitespace-nowrap">{mark} {shorthandUnits}</p>}
            </div>
        )
    }

    const generateLeftOffsetString = (mark) => {
        return `calc(${((mark - min) / (max - min)) * 100}% + ${(-((mark - min) / (max - min))*thumbWidth) + thumbWidth/2}px)`;
    };

    const isIndexFirstOrLast = (array, index) => {
        return (array.length - 1 === index || index === 0) ? true : false;
    };

    return (
        <div className={`flex items-center pt-4 pb-4 pr-2 min-h-12 group ${width} ${styles}`} {...props}>
            {/** Optional Label on Left of Slider*/}
            {label && <label className="font-medium text-gray-700 w-fit pr-2">{label}</label>}

            {/** Main Slider Component with ticks and thumb input*/}
            <div className="flex-grow flex items-center relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    step={step}
                    onChange={handleDrag}
                    className={`${showFill ? 'appearance-auto' : 'appearance-none'} w-full absolute z-10 appearance-nonee hover:cursor-pointer bg-slate-400/50 h-2 rounded-lg focus:outline-none`}
                />
                {/** Thumb Input Number */}
                <div className="absolute z-0 -top-8 w-12 h-24" style={{left: `calc(${((value - min) / (max - min)) * 100}% + ${(-((value - min) / (max - min))*thumbWidth) + thumbWidth/2}px)`}}>
                    <div className="relative ">
                        <div className="absolute w-[0] h-4 top-1 bg-gray-400"></div>
                        <div className="absolute -translate-x-1/2 left-2 -y-translate-full -top-0">
                            <input 
                                type="number" 
                                value={value}
                                className="w-16 text-center text-xs appearance-none bg-transparent py-[1px] group-hover:border border-slate-400"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                {/** Optional TickMarks */}
                {marks && (
                    <div className="absolute z-0 w-full">
                    {marks.map((mark, index) => (
                        <TickMark mark={mark} key={index.toString()} displayValue={isIndexFirstOrLast(marks, index)}/>
                    ))}
                    </div>
                )}
                {/** Min Tickmark with value label */}
                {(!marks || !marks.includes(min)) && <TickMark mark={min} displayValue={true} key={min.toString()}/>}
                {/** Max Tickmark with value label */}
                {(!marks || !marks.includes(max)) && <TickMark mark={max} displayValue={true} key={max.toString()}/>}
            </div>

            {/** Optional Input Box on Right of Slider*/}
            {showSideInput && 
                <div className="w-fit pl-2 text-gray-700 flex justify-center items-center">
                    <input 
                        type="number" 
                        value={value}
                        className="text-center text-md w-12 border appearance-none bg-white/50"
                        onChange={handleChange}
                    />
                    <p className="pl-1">{units}</p> 
                </div>
            }
        </div>
    );
};


