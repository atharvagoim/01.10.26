import { config, img } from '../config.js';
import { Page, HeartPhoto, Locket, Calendar, Counter, H_OUT } from './Bits.jsx';
import Wordle from './Wordle.jsx';
import { Bars } from './MusicButton.jsx';
import { useBurst } from './HeartBurst.jsx';

const s = (o) => ({ margin: 0, ...o });

/* 16 pages in 8 spreads — two side by side on desktop, stacked on phone */
export default function Spreads({ song }) {
  const burst = useBurst();
  const again = () => {
    burst(window.innerWidth / 2, window.innerHeight / 2, 14);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 400);
  };

  return (
    <>
      {/* 1 — cover + I love you */}
      <section className="spread">
        <Page className="cream cover">
          <Locket left={img('auto2-sq.jpg')} right={img('kiss-sq.jpg')} />
          <div className="t2 a-rise d2">
            <span className="m">Happy {config.monthNumber} months</span>
            <span className="script big">Kuchu</span>
          </div>
          <div className="date a-fade d3">{config.anniversaryLabel}</div>
        </Page>
      </section>

      {/* 2 — title + calendar */}
      <section className="spread">
        <Page className="cream p4">
          <div className="stitch t" /><div className="stitch b" />
          <div className="inner">
            <div className="welcome">Welcome to our<br />{config.monthNumber}th month.</div>
            <div className="script month a-rise">{config.calendar.name}</div>
            <Calendar />
            <div className="note">today is our special day</div>
            <div className="began">it all began on {config.beganLabel}</div>
          </div>
        </Page>
      </section>

      {/* 3 — chapter + counter */}
      <section className="spread">
        <Page className="wine p5">
          <div className="script its a-rise">it's our</div>
          <div className="script num a-pop d1">{config.monthNumber}<sup>th</sup></div>
          <div className="script chap a-rise d3">Chapter</div>
        </Page>
        <Page className="cream p6">
          <div className="inner">
            <svg className="constel" viewBox="0 0 300 110" aria-label="How long I've been yours">
              <polyline points="40,30 92,78 150,40 210,82 262,34" />
              {[[40, 30], [92, 78], [150, 40], [210, 82], [262, 34]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" />)}
              <text x="14" y="20" fontSize="22">How</text>
              <text x="66" y="104" fontSize="22">long</text>
              <text x="132" y="28" fontSize="22">I've</text>
              <text x="190" y="108" fontSize="22">been</text>
              <text x="244" y="22" fontSize="22">yours</text>
            </svg>
            <Counter />
            <div className="since mono">{config.monthNumber} months · 43 weeks · and counting</div>
          </div>
          <figure className="polaroid a-pop d2" style={s()}>
            <span className="tape" />
            <img src={img('elev-sq.jpg')} alt="Elevator mirror selfie" loading="lazy" />
            <figcaption>elevator dates</figcaption>
          </figure>
        </Page>
      </section>

      {/* 4 — photo column + letter */}
      <section className="spread">
        <Page className="p7">
          <div className="p7h a-rise">little moments</div>
          <svg className="p7d heart a-pop d3" viewBox="0 0 100 92" aria-hidden="true"><path d={H_OUT} /></svg>
          <figure className="pz a-pop" style={{ left: '5cqw', top: '17cqw', width: '43cqw', '--r': '-6deg' }}>
            <span className="tp" />
            <img src={img('bday.jpg')} alt="Birthday night" loading="lazy" style={{ objectPosition: '45% 30%' }} />
            <figcaption>birthday night</figcaption>
          </figure>
          <figure className="pz a-pop d2" style={{ right: '5cqw', top: '39cqw', width: '43cqw', '--r': '5deg' }}>
            <span className="tp b" />
            <img src={img('auto2.jpg')} alt="Auto ride selfie" loading="lazy" style={{ objectPosition: '52% 20%' }} />
            <figcaption>late rides</figcaption>
          </figure>
          <svg className="p7d arrow a-fade d4" viewBox="0 0 80 50" aria-hidden="true"><path d="M4 6C30 2 52 14 40 30c-8 10-22 4-14-6 6-8 30-2 46 14M64 34l10 8-12 4" /></svg>
          <figure className="pz a-pop d3" style={{ left: '14cqw', top: '87cqw', width: '41cqw', '--r': '-3deg' }}>
            <span className="tp" />
            <img src={img('night.jpg')} alt="Night out" loading="lazy" style={{ objectPosition: '55% 40%' }} />
            <figcaption>just us</figcaption>
          </figure>
          <svg className="p7d star a-pop d5" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.7-5.3 4.8 1.5 7-6.2-3.6-6.2 3.6 1.5-7L2 9.3l7.1-.7z" /></svg>
        </Page>
        <Page className="wine p8">
          <div className="inner">
            <p className="lead a-rise" style={s()}>Another <span className="u">month</span>, another <span className="u">chapter</span>, another <span className="u">reason</span> to celebrate.</p>
            <div className="script happy a-rise d1">Happy {config.monthNumber} Months!</div>
            <p className="body a-rise d2" style={s()}>{config.letter}</p>
          </div>
          <div className="torn" />
        </Page>
      </section>

      {/* 5 — you and me + photo strips */}
      <section className="spread">
        <Page className="cream p9">
          <div className="inner">
            <div className="row a-rise">You and me <img className="av lg" src={img('elev-sq.jpg')} alt="" loading="lazy" /></div>
            <div className="sm a-rise d1">started from a very simple story</div>
            <div className="row2 a-rise d2">
              <img className="av" src={img('her-sq.jpg')} alt="" loading="lazy" /><span className="op">+</span>
              <img className="av" src={img('him-sq.jpg')} alt="" loading="lazy" /><span className="op">→</span>
              <img className="av lg" src={img('kiss-sq.jpg')} alt="" loading="lazy" /><span className="sm" style={s()}>and now</span>
            </div>
            <div className="last a-rise d3">"us" became my favorite thing ever.</div>
          </div>
        </Page>
        <Page className="wine p10">
          <div className="label a-pop"><div className="barcode" /><div className="script">Our nights out</div></div>
          <div className="sleeve">
            <div className="strip" style={{ '--r': '-3deg' }}>
              {['auto1-sq.jpg', 'auto2-sq.jpg', 'bday-sq.jpg'].map((f) => <img key={f} src={img(f)} alt="" loading="lazy" />)}
              <small>FRAME 01–03</small>
            </div>
            <div className="strip" style={{ '--r': '4deg' }}>
              {['night-sq.jpg', 'kiss-sq.jpg', 'elev-sq.jpg'].map((f) => <img key={f} src={img(f)} alt="" loading="lazy" />)}
              <small>FRAME 04–06</small>
            </div>
          </div>
        </Page>
      </section>

      {/* 6 — I love list + best part */}
      <section className="spread">
        <Page className="cream p11">
          <div className="list">
            <div className="script a-rise">I love…</div>
            <ol className="a-rise d1">{config.loveList.map((t) => <li key={t}>{t}</li>)}</ol>
          </div>
          <div className="hearts">
            <HeartPhoto className="a-pop d1" src={img('cheek-sq.jpg')} style={{ '--r': '-6deg', rotate: '-6deg' }} />
            <HeartPhoto className="a-pop d2" src={img('night-sq.jpg')} style={{ '--r': '5deg', rotate: '5deg' }} />
            <HeartPhoto className="a-pop d3" src={img('auto1-sq.jpg')} style={{ '--r': '-4deg', rotate: '-4deg' }} />
          </div>
        </Page>
        <Page className="cream p12">
          <figure className="ph a-pop" style={s({ left: '8cqw', top: '8cqw', width: '38cqw', '--r': '-5deg' })}><img src={img('elev.jpg')} alt="" loading="lazy" style={{ objectPosition: '52% 40%' }} /></figure>
          <figure className="ph a-pop d1" style={s({ right: '7cqw', top: '14cqw', width: '36cqw', '--r': '6deg' })}><img src={img('bday-sq.jpg')} alt="" loading="lazy" /></figure>
          <div className="script w a-rise d2" style={{ left: '12cqw', top: '58cqw' }}>You're</div>
          <div className="script w a-rise d3" style={{ left: '48cqw', top: '66cqw' }}>the</div>
          <div className="script w a-rise d4" style={{ left: '28cqw', top: '80cqw' }}>best</div>
          <div className="script w a-rise d5" style={{ left: '56cqw', top: '94cqw' }}>part</div>
          <figure className="ph a-pop d3" style={s({ left: '7cqw', bottom: '8cqw', width: '34cqw', '--r': '4deg' })}><img src={img('auto2-sq.jpg')} alt="" loading="lazy" /></figure>
          <figure className="ph a-pop d4" style={s({ right: '6cqw', bottom: '6cqw', width: '30cqw', '--r': '-7deg' })}><img src={img('night-sq.jpg')} alt="" loading="lazy" /></figure>
        </Page>
      </section>

      {/* wordle */}
      <section className="spread">
        <Page className="cream pw">
          <Wordle />
        </Page>
      </section>

      {/* 7 — film frame + love of my life */}
      <section className="spread">
        <Page className="wine p14">
          <div className="w a-rise" style={{ left: '9cqw', top: '14cqw', fontSize: '4.6cqw' }}>You're</div>
          <div className="w a-rise d1" style={{ right: '10cqw', top: '24cqw' }}>the</div>
          <HeartPhoto className="bigheart" src={img('cheek-sq.jpg')} />
          <div className="w a-rise d2" style={{ right: '8cqw', top: '62cqw' }}>love</div>
          <div className="w a-rise d3" style={{ left: '8cqw', top: '84cqw' }}>of</div>
          <div className="script w a-rise d4 mylife">my life.</div>
          <div className="ilast a-rise d5">I love you</div>
          <div className="fart a-rise d5">you fart alot but its okayy 💩</div>
        </Page>
      </section>
    </>
  );
}
