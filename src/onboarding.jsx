import { useState, useRef, useEffect } from 'react';
import './onboarding.css';

// ─── Reusable sub-components ──────────────────────────────────────────────────

function StatusBar() {
    return (
        <div className="status-bar">
            <span className="status-time">9:41</span>
            <div className="status-icons">
                {/* Cellular */}
                <svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 12C1.22386 12 1 11.7761 1 11.5V8.5C1 8.22386 1.22386 8 1.5 8H3.5C3.77614 8 4 8.22386 4 8.5V11.5C4 11.7761 3.77614 12 3.5 12H1.5Z" fill="black" />
                    <path d="M6.5 12C6.22386 12 6 11.7761 6 11.5V6.5C6 6.22386 6.22386 6 6.5 6H8.5C8.77614 6 9 6.22386 9 6.5V11.5C9 11.7761 8.77614 12 8.5 12H6.5Z" fill="black" />
                    <path d="M11.5 12C11.22386 12 11 11.7761 11 11.5V4.5C11 4.22386 11.22386 4 11.5 4H13.5C13.7761 4 14 4.22386 14 4.5V11.5C14 11.7761 13.7761 12 13.5 12H11.5Z" fill="black" />
                    <path d="M16.5 12C16.22386 12 16 11.7761 16 11.5V1.5C16 1.22386 16.22386 1 16.5 1H18.5C18.7761 1 19 1.22386 19 1.5V11.5C19 11.7761 18.7761 12 18.5 12H16.5Z" fill="black" />
                </svg>

                {/* Wi-Fi */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 11.5C9.32843 11.5 10 10.8284 10 10C10 9.17157 9.32843 8.5 8.5 8.5C7.67157 8.5 7 9.17157 7 10C7 10.8284 7.67157 11.5 8.5 11.5ZM4.94975 6.44975C6.90237 4.49713 10.0976 4.49713 12.0503 6.44975C12.3431 6.74264 12.818 6.74264 13.1109 6.44975C13.4038 6.15685 13.4038 5.68198 13.1109 5.38909C10.5724 2.85061 6.42758 2.85061 3.88909 5.38909C3.59619 5.68198 3.59619 6.15685 3.88909 6.44975C4.18198 6.74264 4.65685 6.74264 4.94975 6.44975ZM15.9393 2.56066C11.8388 -1.53985 5.16117 -1.53985 1.06066 2.56066C0.767767 2.85355 0.767767 3.32843 1.06066 3.62132C1.35355 3.91421 1.82843 3.91421 2.12132 3.62132C5.63604 0.106602 11.364 0.106602 14.8787 3.62132C15.1716 3.91421 15.6464 3.91421 15.9393 3.62132C16.2322 3.32843 16.2322 2.85355 15.9393 2.56066Z" fill="black" />
                </svg>

                {/* Battery */}
                <svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="22" height="11" rx="2.66667" stroke="black" strokeWidth="1" strokeOpacity="0.35" />
                    <rect x="3" y="3" width="18" height="7" rx="1.33333" fill="black" />
                    <path d="M24 4.5V8.5C25.1046 8.5 26 7.60457 26 6.5C26 5.39543 25.1046 4.5 24 4.5Z" fill="black" fillOpacity="0.4" />
                </svg>
            </div>
        </div>
    );
}

function ProgressBar({ activeIndex }) {
    return (
        <div className="progress-bar">
            {[0, 1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={`progress-line ${i === activeIndex ? 'active' : 'inactive'}`}
                />
            ))}
        </div>
    );
}

function BackArrow({ onClick }) {
    return (
        <button className="back-btn" onClick={onClick} aria-label="Go back">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15 18L9 12L15 6"
                    stroke="#000000"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

function TopBar({ onBack, progressIndex }) {
    return (
        <div className="top-bar">
            <BackArrow onClick={onBack} />
            <ProgressBar activeIndex={progressIndex} />
        </div>
    );
}

// ─── Functional Keyboard ──────────────────────────────────────────────────────
function Keyboard({ onKey }) {
    const rows = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['+', '0', '⌫'],
    ];
    return (
        <div className="keyboard-mock">
            {rows.map((row, ri) => (
                <div className="kb-row" key={ri}>
                    {row.map((k) => (
                        <button
                            key={k}
                            className={`kb-key ${k === '+' || k === '⌫' ? 'dark' : ''}`}
                            onClick={() => {
                                if (k === '⌫') onKey('backspace');
                                else onKey(k);
                            }}
                        >
                            {k}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Phone input formatter ────────────────────────────────────────────────────
function formatPhone(digits) {
    return digits;
}

// OTP formatter — "123 456"
function formatOtp(digits) {
    return digits;
}

// ─── Shared input display with trailing cursor ────────────────────────────────
function InputWithCursor({ text, placeholder }) {
    return (
        <div className="phone-input-row">
            {text.length > 0 ? (
                <>
                    <span className="phone-input-text filled">{text}</span>
                    <span className="input-cursor" />
                </>
            ) : (
                <>
                    <span className="phone-input-text">{placeholder}</span>
                    <span className="input-cursor" />
                </>
            )}
        </div>
    );
}

// ─── Scroll-wheel date picker ─────────────────────────────────────────────────
function PickerColumn({ items, colClass }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) ref.current.scrollTop = 2 * 32;
    }, []);
    return (
        <div ref={ref} className={`picker-col ${colClass}`}>
            {items.map((item) => (
                <div key={item} className="picker-item">{item}</div>
            ))}
        </div>
    );
}

function DatePicker() {
    const days = ['12', '13', '14', '15', '16', '17', '18', '19'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
    const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
    return (
        <div className="date-picker-wrap">
            <div className="picker-overlay-top" />
            <div className="date-picker-columns">
                <PickerColumn items={days} colClass="picker-col-day" />
                <PickerColumn items={months} colClass="picker-col-month" />
                <PickerColumn items={years} colClass="picker-col-year" />
            </div>
            <div className="picker-selection-line" />
            <div className="picker-overlay-bottom" />
        </div>
    );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function ScreenIntro({ cls, onNext }) {
    return (
        <div className={`screen ${cls}`}>
            <StatusBar />
            <ProgressBar activeIndex={0} />
            <div className="intro-bottom">
                <h1 className="intro-app-name">Fluid Onboarding</h1>
                <p className="intro-tagline">
                    Designed to feel fast and intuitive with buttery smooth transitions
                </p>
            </div>
            <div className="intro-btn-wrap">
                <button className="btn-next active-btn" onClick={onNext}>
                    Get Started
                </button>
            </div>
        </div>
    );
}

// Phone screen — fully interactive
function ScreenPhone({ cls, onBack, onNext }) {
    const [digits, setDigits] = useState('');

    function handleKey(k) {
        if (k === 'backspace') {
            setDigits((d) => d.slice(0, -1));
        } else if (k === '+') {
            if (digits.length === 0) {
                setDigits((d) => d + k);
            }
        } else if (digits.length < 15) {
            setDigits((d) => d + k);
        }
    }

    const displayText = formatPhone(digits);
    const canNext = digits.length >= 7;

    return (
        <div className={`screen ${cls}`}>
            <StatusBar />
            <TopBar onBack={onBack} progressIndex={1} />
            <div className="step-content">
                <p className="step-title">Enter your phone number</p>
                <p className="step-subtitle">We'll send a verification code</p>
                <InputWithCursor
                    text={displayText}
                    placeholder="+1234567890"
                />
            </div>
            <div className="bottom-area">
                <button
                    className={`btn-next ${canNext ? 'active-btn' : 'dimmed'}`}
                    onClick={canNext ? onNext : undefined}
                    disabled={!canNext}
                >
                    Next
                </button>
                <Keyboard onKey={handleKey} />
            </div>
        </div>
    );
}

// OTP screen — fully interactive
function ScreenOtp({ cls, onBack, onNext }) {
    const [digits, setDigits] = useState('');

    function handleKey(k) {
        if (k === 'backspace') {
            setDigits((d) => d.slice(0, -1));
        } else if (digits.length < 6) {
            setDigits((d) => d + k);
        }
    }

    const displayText = formatOtp(digits);
    const canNext = digits.length === 6;

    return (
        <div className={`screen ${cls}`}>
            <StatusBar />
            <TopBar onBack={onBack} progressIndex={2} />
            <div className="step-content">
                <p className="step-title">Verify your phone number</p>
                <p className="step-subtitle">Enter the verification code sent to your phone</p>
                <InputWithCursor
                    text={displayText}
                    placeholder="123 456"
                />
            </div>
            <div className="bottom-area">
                <button
                    className={`btn-next ${canNext ? 'active-btn' : 'dimmed'}`}
                    onClick={canNext ? onNext : undefined}
                    disabled={!canNext}
                >
                    Next
                </button>
                <Keyboard onKey={handleKey} />
            </div>
        </div>
    );
}

function ScreenAge({ cls, onBack, onNext }) {
    return (
        <div className={`screen ${cls}`}>
            <StatusBar />
            <TopBar onBack={onBack} progressIndex={3} />
            <div className="age-step-content">
                <p className="step-title">Enter your age</p>
                <p className="step-subtitle">We'll use this to personalize your experience</p>
                <DatePicker />
            </div>
            <button
                className="btn-next active-btn"
                style={{ position: 'absolute', left: 'calc(50% - 164px)', top: 825 }}
                onClick={onNext}
            >
                Next
            </button>
        </div>
    );
}

// ─── Animation engine ─────────────────────────────────────────────────────────

const TOTAL_STEPS = 4; // Intro → Phone → OTP → Age
const ANIMATION_DURATION = 300;

export default function Onboarding() {
    const [current, setCurrent] = useState(1);
    const [entering, setEntering] = useState(null);
    const [exiting, setExiting] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState('forward');
    const busy = useRef(false);

    function goTo(next) {
        if (busy.current) return;
        busy.current = true;

        const isFirstTransition = current === 1 && next === 2;

        if (isFirstTransition) {
            setCurrent(next);
            busy.current = false;
            return;
        }

        const isBackward = next < current;
        setDirection(isBackward ? 'backward' : 'forward');
        setExiting(current);
        setEntering(next);
        setIsAnimating(false);
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsAnimating(true);
                setTimeout(() => {
                    setCurrent(next);
                    setEntering(null);
                    setExiting(null);
                    setIsAnimating(false);
                    busy.current = false;
                }, ANIMATION_DURATION);
            });
        });
    }

    const forward = () => { if (current < TOTAL_STEPS) goTo(current + 1); };
    const back = () => { if (current > 1) goTo(current - 1); };

    function clsFor(s) {
        const isBackward = direction === 'backward';
        const isFirstTransition = current === 1 && entering !== null;
        const isForwardSmart = current >= 2 && !isBackward;
        
        if (s === exiting) {
            if (isBackward) return isAnimating ? 'screen exit' : 'screen active';
            if (isFirstTransition) return isAnimating ? 'screen exit-top' : 'screen active';
            return isAnimating ? 'screen exit' : 'screen active';
        }
        if (s === entering) {
            if (isBackward) return isAnimating ? 'screen active' : 'screen enter';
            if (isFirstTransition) return isAnimating ? 'screen active' : 'screen enter-bottom';
            return isAnimating ? 'screen active' : 'screen enter';
        }
        if (s === current) return 'screen active';
        return 'screen hidden';
    }

    return (
        <div className="onboarding-page">
            <div className="phone-frame">
                <div className="slides-container">
                    <ScreenIntro cls={clsFor(1)} onNext={forward} />
                    <ScreenPhone cls={clsFor(2)} onBack={back} onNext={forward} />
                    <ScreenOtp cls={clsFor(3)} onBack={back} onNext={forward} />
                    <ScreenAge cls={clsFor(4)} onBack={back} onNext={forward} />
                </div>
            </div>
        </div>
    );
}

