import React from'react';import'./wave-title.css';
const lines=['你的人生，','不只有一种','正确答案。'];
export default function WaveTitle(){let offset=0;return <h1 className="waveTitle" aria-label={lines.join('')}>{lines.map((line,li)=><React.Fragment key={line}><span className="waveLine">{[...line].map((char,i)=><span className="waveChar" aria-hidden="true" style={{'--wave-delay':`${(offset+i)*55}ms`}} key={`${li}-${i}`}>{char}</span>)}</span>{(offset+=line.length)&&li<lines.length-1?<br/>:null}</React.Fragment>)}</h1>}
