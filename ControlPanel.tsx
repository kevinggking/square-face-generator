"use client";

import { useState, useEffect } from "react";
import htmlToImage from "html-to-image";
import FacePreview from "./FacePreview";

const SKIN_COLORS = ["#ffdab9", "#e0b899", "#c68642", "#8d5524", "#ffe0bd"];
const HAIR_COLORS = ["#8b5a2b", "#4a2c0d", "#000000", "#ffdbac", "#b89778", "#ff69b4", "#00ced1"];
const BG_COLORS = ["#a3dffa", "#ffcccc", "#d4a5ff", "#fff3e0", "#c8e6c9", "#e0f7fa", "#ffffff", "#f5f5f5"];

export default function ControlPanel() {
  const [skin, setSkin] = useState(0);
  const [hairStyle, setHairStyle] = useState(0);
  const [hairColorIdx, setHairColorIdx] = useState(0);
  const [eye, setEye] = useState(0);
  const [mouth, setMouth] = useState(0);
  const [bg, setBg] = useState(6);

  const randomize = () => {
    setSkin(Math.floor(Math.random() * SKIN_COLORS.length));
    setHairStyle(Math.floor(Math.random() * 6));
    setHairColorIdx(Math.floor(Math.random() * HAIR_COLORS.length));
    setEye(Math.floor(Math.random() * 5));
    setMouth(Math.floor(Math.random() * 5));
    setBg(Math.floor(Math.random() * BG_COLORS.length));
  };

  useEffect(() => {
    randomize();
  }, []);

  const download = async () => {
    const node = document.getElementById("face-preview");
    if (!node) return;

    try {
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        width: 512,
        height: 512,
        pixelRatio: 3,
      });

      const link = document.createElement("a");
      link.download = `square-face-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("下载失败", err);
      alert("下载失败，请重试");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-6 max-w-6xl mx-auto">
      {/* 预览区 */}
      <div className="w-80 h-80 md:w-96 md:h-96 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white">
        <div id="face-preview">
          <FacePreview
            skinColor={SKIN_COLORS[skin]}
            hairStyle={hairStyle}
            hairColor={HAIR_COLORS[hairColorIdx]}
            eyeStyle={eye}
            mouthStyle={mouth}
            bgColor={BG_COLORS[bg]}
          />
        </div>
      </div>

      {/* 控制区 */}
      <div className="flex flex-col gap-6 w-full md:w-96 bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Square Face Maker
        </h1>

        <button
          onClick={randomize}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:opacity-90 transition"
        >
          随机生成一只！✨
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-600">肤色</label>
            <div className="flex flex-wrap gap-2">
              {SKIN_COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSkin(i)}
                  className={`w-8 h-8 rounded-full border-2 ${skin === i ? "border-black" : "border-gray-300"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-600">发色</label>
            <div className="flex flex-wrap gap-2">
              {HAIR_COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setHairColorIdx(i)}
                  className={`w-8 h-8 rounded-full border-2 ${hairColorIdx === i ? "border-black" : "border-gray-300"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1 text-slate-600">发型</label>
            <select
              value={hairStyle}
              onChange={e => setHairStyle(+e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value={0}>短直</option>
              <option value={1}>波波头</option>
              <option value={2}>长侧分</option>
              <option value={3}>乱乱的</option>
              <option value={4}>马尾</option>
              <option value={5}>光头</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-600">眼睛</label>
            <select
              value={eye}
              onChange={e => setEye(+e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value={0}>圆睁</option>
              <option value={1}>半闭</option>
              <option value={2}>笑眼</option>
              <option value={3}>wink</option>
              <option value={4}>惊讶</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-600">嘴巴</label>
            <select
              value={mouth}
              onChange={e => setMouth(+e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value={0}>微笑</option>
              <option value={1}>大笑</option>
              <option value={2}>平嘴</option>
              <option value={3}>O 型</option>
              <option value={4}>猫嘴</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-600">背景色</label>
          <div className="flex flex-wrap gap-2">
            {BG_COLORS.map((c, i) => (
              <button
                key={i}
                onClick={() => setBg(i)}
                className={`w-8 h-8 rounded-full border-2 ${bg === i ? "border-black" : "border-gray-300"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={download}
          className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl text-lg font-bold hover:opacity-90 transition"
        >
          下载 PNG (512×512)
        </button>

        <p className="text-center text-sm text-slate-500 mt-2">
          纯前端 · 无需登录 · 可商用
        </p>
      </div>
    </div>
  );
}