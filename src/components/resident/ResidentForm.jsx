import React from "react";
import imges from "../../../public/gm.png";

const ResidentForm = () => {
  return (
    <div className="">
      <form>
        <img className="resident_img" alt="res img" src={imges} />

        <label>
          입소자 성명
          <input required placeholder="이름" type="text" name="name" />
        </label>

        <label>
          성별
          <input required placeholder="성별" type="text" name="gender" />
        </label>

        <label>
          생년월일
          <input required placeholder="생년월일" type="text" name="birth" />
        </label>

        <label>
          전화번호
          <input required placeholder="전화번호" type="tel" name="phone" />
        </label>

        <label>
          전화번호
          <input required placeholder="전화번호" type="tel" name="phone" />
        </label>

        <label>
          등급
          <input required placeholder="등급" type="text" name="grade" />
        </label>

        <label>
          치매
          <input type="checkbox" name="dementiaYn" />
          낙상위험
          <input type="checkbox" name="fallYn" />
          욕창위험
          <input type="checkbox" name="bedsoreYn" />
          자세변경
          <input type="checkbox" name="postureYn" />
        </label>

        <label>
          주요질환
          <input required placeholder="주요질환" type="text" name="disease" />
        </label>

        <label>
          생활실
          <input required placeholder="생활실" type="text" name="location" />
        </label>

        <label>
          입소일
          <input required type="date" name="enterdate" />
        </label>

        <label>
          퇴소일
          <input type="date" name="exitdate" />
        </label>

        <label>
          주소
          <input required placeholder="주소" type="text" name="address" />
        </label>

        <label>
          최종학력
          <input
            required
            placeholder="최종학력"
            type="text"
            name="schoolgrade"
          />
        </label>

        <label>
          요양시스템 입소자 코드
          <input
            required
            placeholder="입소자 코드"
            type="text"
            name="systemcode"
          />
        </label>

        <label>
          장기요양인정번호
          <input
            required
            placeholder="장기요양인정번호"
            type="text"
            name="longtermNo"
          />
        </label>

        <label>
          케어그룹
          <input required placeholder="케어그룹" type="text" name="caregroup" />
        </label>

        <label>
          식사종류
          <input required placeholder="식사종류" type="text" name="foodtype" />
        </label>

        <label>
          기능장애
          <input
            required
            placeholder="기능장애"
            type="text"
            name="functiondis"
          />
        </label>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default ResidentForm;
