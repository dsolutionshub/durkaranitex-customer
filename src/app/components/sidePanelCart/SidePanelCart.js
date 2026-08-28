"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import useCartPanelStore from "@/store/useCartPanelStore";
import { loader } from "../loader/loaderManager";
import { toastCom } from "../toast/ToastManager";
import {
  handleCheckout,
  modifyCart,
  removeCart,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";

import "./style.css";

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 1H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 6H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 10.5V1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProgressTruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
    <path
      d="M18.1509 6.77558H18.8009C18.8009 6.668 18.7742 6.5621 18.7232 6.46738L18.1509 6.77558ZM9.77434 0.778871L9.9752 0.160685L9.9752 0.160684L9.77434 0.778871ZM11.4597 2.46428L10.8416 2.66514L10.8416 2.66514L11.4597 2.46428ZM11.6739 5.56632L11.0557 5.76718L11.0557 5.76718L11.6739 5.56632ZM12.7975 6.68992L12.5966 7.30811L12.5966 7.30811L12.7975 6.68992ZM3.24311 13.5259C3.60165 13.5437 3.90679 13.2676 3.92466 12.909C3.94254 12.5505 3.66637 12.2453 3.30783 12.2275L3.27547 12.8767L3.24311 13.5259ZM1.29111 12.26L0.831495 12.7197L0.831495 12.7197L1.29111 12.26ZM6.77553 12.2508C6.41654 12.2508 6.12555 12.5418 6.12558 12.9008C6.12561 13.2598 6.41664 13.5508 6.77563 13.5508L6.77558 12.9008L6.77553 12.2508ZM15.4935 12.2275C15.1349 12.2453 14.8588 12.5505 14.8767 12.909C14.8945 13.2676 15.1997 13.5437 15.5582 13.5259L15.5258 12.8767L15.4935 12.2275ZM0.650391 0.000390649C0.291406 0.000390649 0.000390649 0.291406 0.000390649 0.650391C0.000390649 1.00938 0.291406 1.30039 0.650391 1.30039V0.650391V0.000390649ZM1.32369 10.2433C1.30582 9.88478 1.00068 9.60862 0.642138 9.62649C0.283598 9.64436 0.00743206 9.9495 0.0253041 10.308L0.674498 10.2757L1.32369 10.2433ZM0.650569 3.5004C0.291584 3.5004 0.000568669 3.79142 0.000568669 4.1504C0.000568669 4.50939 0.291584 4.8004 0.650569 4.8004V4.1504V3.5004ZM5.90073 4.8004C6.25971 4.8004 6.55073 4.50939 6.55073 4.1504C6.55073 3.79142 6.25971 3.5004 5.90073 3.5004V4.1504V4.8004ZM0.650569 6.12516C0.291584 6.12516 0.000568669 6.41618 0.000568669 6.77516C0.000568669 7.13415 0.291584 7.42516 0.650569 7.42516V6.77516V6.12516ZM4.15068 7.42516C4.50966 7.42516 4.80068 7.13415 4.80068 6.77516C4.80068 6.41618 4.50966 6.12516 4.15068 6.12516V6.77516V7.42516ZM11.5881 1.7504C11.2291 1.7504 10.9381 2.04142 10.9381 2.4004C10.9381 2.75939 11.2291 3.0504 11.5881 3.0504V2.4004V1.7504ZM17.0339 4.70128L16.4616 5.00945L16.4616 5.00948L17.0339 4.70128ZM15.6101 2.70991L15.9434 2.15187L15.9434 2.15187L15.6101 2.70991ZM15.5265 12.9003H14.8765C14.8765 13.5079 14.3839 14.0004 13.7764 14.0004V14.6504V15.3004C15.1019 15.3004 16.1765 14.2259 16.1765 12.9003H15.5265ZM13.7764 14.6504V14.0004C13.1689 14.0004 12.6763 13.5079 12.6763 12.9003H12.0263H11.3763C11.3763 14.2259 12.4509 15.3004 13.7764 15.3004V14.6504ZM12.0263 12.9003H12.6763C12.6763 12.2928 13.1689 11.8003 13.7764 11.8003V11.1503V10.5003C12.4509 10.5003 11.3763 11.5748 11.3763 12.9003H12.0263ZM13.7764 11.1503V11.8003C14.3839 11.8003 14.8765 12.2928 14.8765 12.9003H15.5265H16.1765C16.1765 11.5748 15.1019 10.5003 13.7764 10.5003V11.1503ZM6.77665 12.9005H6.12665C6.12665 13.508 5.63414 14.0005 5.0266 14.0005V14.6505V15.3005C6.35211 15.3005 7.42665 14.226 7.42665 12.9005H6.77665ZM5.0266 14.6505V14.0005C4.41906 14.0005 3.92655 13.508 3.92655 12.9005H3.27655H2.62655C2.62655 14.226 3.70109 15.3005 5.0266 15.3005V14.6505ZM3.27655 12.9005H3.92655C3.92655 12.2929 4.41906 11.8004 5.0266 11.8004V11.1504V10.5004C3.70109 10.5004 2.62655 11.5749 2.62655 12.9005H3.27655ZM5.0266 11.1504V11.8004C5.63414 11.8004 6.12665 12.2929 6.12665 12.9005H6.77665H7.42665C7.42665 11.5749 6.35211 10.5004 5.0266 10.5004V11.1504ZM18.1509 6.77558H17.5009V8.52563H18.1509H18.8009V6.77558H18.1509ZM14.0383 6.77558V7.42558H18.1509V6.77558V6.12558H14.0383V6.77558ZM18.1509 8.52563H17.5009C17.5009 9.57523 17.4995 10.297 17.4266 10.8394C17.3562 11.363 17.23 11.621 17.0506 11.8004L17.5102 12.26L17.9698 12.7197C18.4311 12.2584 18.6253 11.6804 18.715 11.0126C18.8023 10.3635 18.8009 9.53848 18.8009 8.52563H18.1509ZM7.91311 0.650391V1.30039C8.94091 1.30039 9.30065 1.30841 9.57348 1.39706L9.77434 0.778871L9.9752 0.160684C9.45718 -0.00762862 8.83972 0.000390649 7.91311 0.000390649V0.650391ZM11.5882 4.3255H12.2382C12.2382 3.39889 12.2462 2.78143 12.0779 2.26341L11.4597 2.46428L10.8416 2.66514C10.9302 2.93797 10.9382 3.29771 10.9382 4.3255H11.5882ZM9.77434 0.778871L9.57348 1.39706C10.1748 1.59243 10.6462 2.06385 10.8416 2.66514L11.4597 2.46428L12.0779 2.26342C11.754 1.26636 10.9723 0.484649 9.9752 0.160685L9.77434 0.778871ZM11.5882 4.3255H10.9382C10.9382 4.92638 10.9302 5.38097 11.0557 5.76718L11.6739 5.56632L12.2921 5.36546C12.2462 5.22444 12.2382 5.02756 12.2382 4.3255H11.5882ZM14.0383 6.77558V6.12558C13.3362 6.12558 13.1394 6.11756 12.9983 6.07174L12.7975 6.68992L12.5966 7.30811C12.9828 7.4336 13.4374 7.42558 14.0383 7.42558V6.77558ZM11.6739 5.56632L11.0557 5.76718C11.2931 6.49785 11.866 7.0707 12.5966 7.30811L12.7975 6.68992L12.9983 6.07174C12.6634 5.96292 12.4009 5.70036 12.2921 5.36546L11.6739 5.56632ZM3.27547 12.8767L3.30783 12.2275C2.36654 12.1805 1.9913 12.041 1.75073 11.8004L1.29111 12.26L0.831495 12.7197C1.44298 13.3311 2.26508 13.4771 3.24311 13.5259L3.27547 12.8767ZM12.0263 12.9003L12.0263 12.2503L6.77553 12.2508L6.77558 12.9008L6.77563 13.5508L12.0264 13.5503L12.0263 12.9003ZM15.5258 12.8767L15.5582 13.5259C16.5362 13.4771 17.3583 13.3311 17.9698 12.7197L17.5102 12.26L17.0506 11.8004C16.81 12.041 16.4348 12.1805 15.4935 12.2275L15.5258 12.8767ZM0.650391 0.650391V1.30039H7.91311V0.650391V0.000390649H0.650391V0.650391ZM0.674498 10.2757L0.0253041 10.308C0.0740557 11.2861 0.220013 12.1082 0.831495 12.7197L1.29111 12.26L1.75073 11.8004C1.51017 11.5599 1.37061 11.1846 1.32369 10.2433L0.674498 10.2757ZM0.650569 4.1504V4.8004H5.90073V4.1504V3.5004H0.650569V4.1504ZM0.650569 6.77516V7.42516H4.15068V6.77516V6.12516H0.650569V6.77516ZM11.5881 2.4004V3.0504H13.1817V2.4004V1.7504H11.5881V2.4004ZM17.0339 4.70128L16.4616 5.00948L17.5786 7.08377L18.1509 6.77558L18.7232 6.46738L17.6062 4.39309L17.0339 4.70128ZM13.1817 2.4004V3.0504C13.8314 3.0504 14.2708 3.05116 14.6138 3.0858C14.9422 3.11896 15.1281 3.17913 15.2768 3.26794L15.6101 2.70991L15.9434 2.15187C15.5739 1.93117 15.1823 1.83659 14.7444 1.79238C14.3211 1.74964 13.8054 1.7504 13.1817 1.7504V2.4004ZM17.0339 4.70128L17.6062 4.39312C17.3105 3.84393 17.0666 3.3895 16.8283 3.03709C16.5818 2.67251 16.3129 2.37257 15.9434 2.15187L15.6101 2.70991L15.2768 3.26794C15.4254 3.35675 15.5665 3.49187 15.7514 3.7653C15.9445 4.05088 16.1535 4.43739 16.4616 5.00945L17.0339 4.70128Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
    <path
      d="M15.6508 5.90014H16.3008C16.3008 5.79256 16.2741 5.68666 16.2231 5.59195L15.6508 5.90014ZM15.1017 10.6011L14.642 10.1414L14.642 10.1414L15.1017 10.6011ZM8.47092 0.76015L8.67178 0.141963L8.67178 0.141962L8.47092 0.76015ZM9.91555 2.20477L9.29736 2.40563L9.29736 2.40563L9.91555 2.20477ZM10.0991 4.86364L9.48091 5.0645L9.48091 5.06451L10.0991 4.86364ZM11.0622 5.82672L10.8613 6.44491L10.8613 6.44491L11.0622 5.82672ZM2.8681 11.7788C3.22664 11.7967 3.53178 11.5205 3.54965 11.162C3.56752 10.8034 3.29136 10.4983 2.93282 10.4804L2.90046 11.1296L2.8681 11.7788ZM1.19958 10.6011L0.739965 11.0607L0.739965 11.0607L1.19958 10.6011ZM13.3684 10.4804C13.0099 10.4983 12.7337 10.8034 12.7516 11.162C12.7695 11.5205 13.0746 11.7967 13.4331 11.7788L13.4008 11.1296L13.3684 10.4804ZM0.650391 2.44379e-05C0.291406 2.44379e-05 0.000390649 0.291039 0.000390649 0.650024C0.000390649 1.00901 0.291406 1.30002 0.650391 1.30002V0.650024V2.44379e-05ZM1.32025 8.86785C1.30238 8.50931 0.997234 8.23314 0.638694 8.25101C0.280154 8.26888 0.00398801 8.57403 0.0218602 8.93257L0.671054 8.90021L1.32025 8.86785ZM0.650543 3.00001C0.291558 3.00001 0.000543237 3.29102 0.000543237 3.65001C0.000543237 4.00899 0.291558 4.30001 0.650543 4.30001V3.65001V3.00001ZM5.15068 4.30001C5.50967 4.30001 5.80068 4.00899 5.80068 3.65001C5.80068 3.29102 5.50967 3.00001 5.15068 3.00001V3.65001V4.30001ZM0.650543 5.24978C0.291558 5.24978 0.000543237 5.5408 0.000543237 5.89978C0.000543237 6.25877 0.291558 6.54978 0.650543 6.54978V5.89978V5.24978ZM3.65063 6.54978C4.00962 6.54978 4.30063 6.25877 4.30063 5.89978C4.30063 5.5408 4.00962 5.24978 3.65063 5.24978V5.89978V6.54978ZM10.0255 1.50002C9.66656 1.50002 9.37554 1.79104 9.37554 2.15002C9.37554 2.50901 9.66656 2.80002 10.0255 2.80002V2.15002V1.50002ZM14.6934 4.12219L14.1211 4.43036L14.1211 4.43038L14.6934 4.12219ZM13.473 2.41531L13.8063 1.85727L13.8063 1.85727L13.473 2.41531ZM13.4013 11.1499H12.7513C12.7513 11.6194 12.3707 11.9999 11.9013 11.9999V12.6499V13.2999C13.0887 13.2999 14.0513 12.3373 14.0513 11.1499H13.4013ZM11.9013 12.6499V11.9999C11.4318 11.9999 11.0512 11.6194 11.0512 11.1499H10.4012H9.75121C9.75121 12.3373 10.7138 13.2999 11.9013 13.2999V12.6499ZM10.4012 11.1499H11.0512C11.0512 10.6804 11.4318 10.2999 11.9013 10.2999V9.64987V8.99987C10.7138 8.99987 9.75121 9.96246 9.75121 11.1499H10.4012ZM11.9013 9.64987V10.2999C12.3707 10.2999 12.7513 10.6804 12.7513 11.1499H13.4013H14.0513C14.0513 9.96246 13.0887 8.99987 11.9013 8.99987V9.64987ZM5.90147 11.15H5.25147C5.25147 11.6194 4.8709 12 4.40143 12V12.65V13.3C5.58886 13.3 6.55147 12.3374 6.55147 11.15H5.90147ZM4.40143 12.65V12C3.93195 12 3.55138 11.6194 3.55138 11.15H2.90138H2.25138C2.25138 12.3374 3.21399 13.3 4.40143 13.3V12.65ZM2.90138 11.15H3.55138C3.55138 10.6805 3.93195 10.3 4.40143 10.3V9.64996V8.99996C3.21399 8.99996 2.25138 9.96255 2.25138 11.15H2.90138ZM4.40143 9.64996V10.3C4.8709 10.3 5.25147 10.6805 5.25147 11.15H5.90147H6.55147C6.55147 9.96255 5.58886 8.99996 4.40143 8.99996V9.64996ZM15.6508 5.90014H15.0008V7.40017H15.6508H16.3008V5.90014H15.6508ZM12.1257 5.90014V6.55014H15.6508V5.90014V5.25014H12.1257V5.90014ZM15.6508 7.40017H15.0008C15.0008 8.30245 14.9995 8.91377 14.938 9.37099C14.879 9.80951 14.7757 10.0078 14.642 10.1414L15.1017 10.6011L15.5613 11.0607C15.9768 10.6452 16.1481 10.1269 16.2264 9.54421C16.3022 8.98024 16.3008 8.2657 16.3008 7.40017H15.6508ZM6.87558 0.650024V1.30002C7.76377 1.30002 8.05372 1.30804 8.27006 1.37834L8.47092 0.76015L8.67178 0.141962C8.21025 -0.00799471 7.66259 2.44379e-05 6.87558 2.44379e-05V0.650024ZM10.0257 3.80009H10.6757C10.6757 3.01309 10.6837 2.46543 10.5337 2.00391L9.91555 2.20477L9.29736 2.40563C9.36766 2.62197 9.37568 2.91191 9.37568 3.80009H10.0257ZM8.47092 0.76015L8.27006 1.37834C8.75718 1.53661 9.13909 1.91852 9.29736 2.40563L9.91555 2.20477L10.5337 2.00391C10.2469 1.12102 9.55467 0.428828 8.67178 0.141963L8.47092 0.76015ZM10.0257 3.80009H9.37568C9.37568 4.3079 9.36766 4.71596 9.48091 5.0645L10.0991 4.86364L10.7173 4.66278C10.6837 4.55942 10.6757 4.40908 10.6757 3.80009H10.0257ZM12.1257 5.90014V5.25014C11.5167 5.25014 11.3664 5.24212 11.263 5.20854L11.0622 5.82672L10.8613 6.44491C11.2099 6.55816 11.6179 6.55014 12.1257 6.55014V5.90014ZM10.0991 4.86364L9.48091 5.06451C9.69359 5.71906 10.2068 6.23223 10.8613 6.44491L11.0622 5.82672L11.263 5.20854C11.0043 5.12445 10.8014 4.92156 10.7173 4.66278L10.0991 4.86364ZM2.90046 11.1296L2.93282 10.4804C2.12862 10.4403 1.83891 10.3212 1.6592 10.1414L1.19958 10.6011L0.739965 11.0607C1.29059 11.6113 2.02716 11.7369 2.8681 11.7788L2.90046 11.1296ZM10.4012 11.1499L10.4012 10.4999L5.90146 10.5L5.90147 11.15L5.90148 11.8L10.4012 11.7999L10.4012 11.1499ZM13.4008 11.1296L13.4331 11.7788C14.2741 11.7369 15.0107 11.6113 15.5613 11.0607L15.1017 10.6011L14.642 10.1414C14.4623 10.3212 14.1726 10.4403 13.3684 10.4804L13.4008 11.1296ZM0.650391 0.650024V1.30002H6.87558V0.650024V2.44379e-05H0.650391V0.650024ZM0.671054 8.90021L0.0218602 8.93257C0.0637781 9.7735 0.189342 10.5101 0.739965 11.0607L1.19958 10.6011L1.6592 10.1414C1.4795 9.96175 1.36033 9.67204 1.32025 8.86785L0.671054 8.90021ZM0.650543 3.65001V4.30001H5.15068V3.65001V3.00001H0.650543V3.65001ZM0.650543 5.89978V6.54978H3.65063V5.89978V5.24978H0.650543V5.89978ZM10.0255 2.15002V2.80002H11.3915V2.15002V1.50002H10.0255V2.15002ZM14.6934 4.12219L14.1211 4.43038L15.0786 6.20834L15.6508 5.90014L16.2231 5.59195L15.2657 3.81399L14.6934 4.12219ZM11.3915 2.15002V2.80002C11.9503 2.80002 12.3214 2.80078 12.6097 2.82989C12.8834 2.85753 13.028 2.90664 13.1397 2.97335L13.473 2.41531L13.8063 1.85727C13.4738 1.65869 13.1234 1.57516 12.7403 1.53647C12.3718 1.49926 11.9243 1.50002 11.3915 1.50002V2.15002ZM14.6934 4.12219L15.2657 3.81402C15.0131 3.34493 14.8016 2.95057 14.5941 2.64373C14.3784 2.32473 14.1388 2.05586 13.8063 1.85727L13.473 2.41531L13.1397 2.97335C13.2513 3.04005 13.3631 3.14409 13.5172 3.37194C13.6795 3.61195 13.8562 3.93839 14.1211 4.43036L14.6934 4.12219Z"
      fill="currentColor"
    />
  </svg>
);

const NoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
    <path
      d="M4.24818 0.75V2.85M9.85182 0.75V2.85M4.24818 7.05H9.84818M4.24818 10.5482H7.04818M13.35 5.3V11.25C13.35 13.35 12.3 14.75 9.85 14.75H4.25C1.8 14.75 0.75 13.35 0.75 11.25V5.3C0.75 3.2 1.8 1.8 4.25 1.8H9.85C12.3 1.8 13.35 3.2 13.35 5.3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CouponIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
    <path
      d="M6.25 9.0625L10.75 4.5625M10.7446 9.0625H10.7536M6.24588 4.9375H6.25262M14.125 7.375C14.125 6.34 14.965 5.5 16 5.5V4.75C16 1.75 15.25 1 12.25 1H4.75C1.75 1 1 1.75 1 4.75V5.125C2.035 5.125 2.875 5.965 2.875 7C2.875 8.035 2.035 8.875 1 8.875V9.25C1 12.25 1.75 13 4.75 13H12.25C15.25 13 16 12.25 16 9.25C14.965 9.25 14.125 8.41 14.125 7.375Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
}

function CartQuantity({ decreaseCount, increaseCount, removeFromCart, product }) {
  const outOfStock = parseFloat(product?.product?.quantity) <= 0;
  const atMin = product?.quantity === 1;

  return (
    <div className="aq-product-details-quantity d-flex align-items-center">
      <div className={`aq-product-quantity${outOfStock ? " aq-cartmini-qty-disabled" : ""}`}>
        <button
          type="button"
          className="aq-cart-minus"
          disabled={atMin || outOfStock}
          aria-label="Decrease quantity"
          onClick={(e) => decreaseCount(e, product?.product_id, product?.quantity)}
        >
          <MinusIcon />
        </button>
        <input
          className="aq-cart-input"
          type="text"
          readOnly
          value={product?.quantity || 0}
        />
        <button
          type="button"
          className="aq-cart-plus"
          disabled={outOfStock}
          aria-label="Increase quantity"
          onClick={(e) =>
            increaseCount(
              e,
              product?.product_id,
              product?.quantity,
              product?.product?.quantity
            )
          }
        >
          <PlusIcon />
        </button>
      </div>
      <button
        type="button"
        className="aq-line-anim aq-cartmini-remove aq-remove"
        onClick={(e) => removeFromCart(e, product?.id)}
      >
        Remove
      </button>
    </div>
  );
}

const SidePanelCart = () => {
  const router = useRouter();
  const {
    isCartOpen,
    setCartOpen,
    cartProducts,
    cartTotalAmount,
    cardDetails,
  } = useCartPanelStore();
  const [toolPanel, setToolPanel] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [shippingState, setShippingState] = useState("Tamil Nadu");
  const [shippingZip, setShippingZip] = useState("");

  const hasItems = cartProducts?.length > 0;
  const progressWidth = hasItems ? "100%" : "8%";

  const closeToolPanel = () => setToolPanel(null);

  function handleNavigate(page) {
    router.push(page);
    setCartOpen(false);
  }

  const increaseCount = async (e, id, currentQuantity, totalQuantities) => {
    e.stopPropagation();
    if (currentQuantity >= totalQuantities) {
      toastCom(
        "You've reached the maximum quantity allowed.",
        true,
        "error",
        2000
      );
      return;
    }
    loader(true);
    try {
      await modifyCart({
        product_id: id,
        quantity: currentQuantity + 1,
        type: "cart",
      });
      cardDetails();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const decreaseCount = async (e, id, currentQuantity) => {
    e.stopPropagation();
    loader(true);
    try {
      await modifyCart({
        product_id: id,
        quantity: currentQuantity - 1,
        type: "cart",
      });
      cardDetails();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  async function handleNavigateToCheckout() {
    loader(true);
    try {
      await handleCheckout();
      handleNavigate("/checkout");
    } catch (error) {
      const status = error.response.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/checkout");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  }

  const removeFromCart = async (e, id) => {
    e.stopPropagation();
    loader(true);
    try {
      const data = await removeCart({
        cart_id: id,
      });
      cardDetails();
      toast.success(data?.message);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
    setCartOpen(false);
  };

  useEffect(() => {
    if (!isCartOpen) {
      setToolPanel(null);
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      <div
        className={`aq-cartmini-overlay${isCartOpen ? " opened" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <div
        className={`aq-cartmini-area aq-cartmini-active d-flex flex-column justify-content-between${
          isCartOpen ? " opened" : ""
        }`}
      >
        <div className="aq-cartmini-header">
          <button
            type="button"
            className="aq-cartmini-close aq-cartmini-close-icon"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          >
            <CloseIcon />
          </button>
          <h4 className="aq-cartmini-title">Shopping Cart</h4>
          <div className="aq-cartmini-shiping">
            <div className="aq-cartmini-shiping-message">
              <p>
                {hasItems ? (
                  <>
                    Shipping will be calculated at <b>checkout</b>
                  </>
                ) : (
                  <>
                    Add items to your cart to checkout
                  </>
                )}
              </p>
            </div>
            <div className="aq-progress-bar">
              <div style={{ width: progressWidth }}>
                <div className="progress-car">
                  <ProgressTruckIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="aq-cartmini-body">
          {hasItems ? (
            cartProducts.map((product) => {
              const outOfStock = parseFloat(product?.product?.quantity) <= 0;
              const imageSrc = product?.product?.images?.[0]?.image || "/images/home/KCLogo.png";
              const variantLabel =
                product?.product?.size ||
                product?.size ||
                product?.product?.color ||
                product?.color;

              return (
                <div
                  key={product?.id || product?.product?.id}
                  className="aq-cartmini-product-item mb-15 item-delete d-flex align-items-center"
                >
                  <div
                    className="aq-cartmini-product-thumbnail"
                    onClick={() => navigateToProductDetail(product?.product_id)}
                  >
                    <Image
                      src={imageSrc}
                      alt={product?.product?.title || "Product"}
                      width={110}
                      height={146}
                      className={outOfStock ? "aq-cartmini-oos-dim" : undefined}
                    />
                    {outOfStock && <span className="aq-cartmini-oos">Out of Stock</span>}
                  </div>
                  <div className="aq-cartmini-product-summary">
                    <h4 className={`aq-product-title${outOfStock ? " aq-cartmini-oos-dim" : ""}`}>
                      <button
                        type="button"
                        onClick={() => navigateToProductDetail(product?.product_id)}
                      >
                        {product?.product?.title}
                      </button>
                    </h4>
                    {variantLabel ? (
                      <span className="aq-cartmini-product-size">
                        <label>Size:</label> {variantLabel}
                      </span>
                    ) : null}
                    <span className="aq-cartmini-product-price">
                      Rs. {formatPrice(product?.product?.price)}
                    </span>
                    <CartQuantity
                      increaseCount={increaseCount}
                      decreaseCount={decreaseCount}
                      removeFromCart={removeFromCart}
                      product={product}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cartmini-empty text-center">
              <p>Your Cart is empty</p>
              <button
                type="button"
                className="aq-btn-black border-btn"
                onClick={() => {
                  setCartOpen(false);
                  router.push("/shop");
                }}
              >
                Go to Shop
              </button>
            </div>
          )}
        </div>

        <div className="aq-cartmini-footer">
          <div className="aq-cartmini-btn-wrap">
            <button
              type="button"
              className="aq-cartmini-btn aq-note-btn aq-tooltip-top"
              onClick={() => setToolPanel("note")}
            >
              <span>
                <NoteIcon />
              </span>
              <span>Note</span>
              <span className="aq-tooltip-item">Add note for seller</span>
            </button>
            <button
              type="button"
              className="aq-cartmini-btn aq-coupon-btn aq-tooltip-top"
              onClick={() => setToolPanel("coupon")}
            >
              <span>
                <CouponIcon />
              </span>
              <span>Coupon</span>
              <span className="aq-tooltip-item">Add a discount code</span>
            </button>
            <button
              type="button"
              className="aq-cartmini-btn aq-shipping-btn aq-tooltip-top"
              onClick={() => setToolPanel("shipping")}
            >
              <span>
                <TruckIcon />
              </span>
              <span>Shipping</span>
              <span className="aq-tooltip-item">Add a discount code</span>
            </button>
          </div>
          <div className="aq-cartmini-total d-flex justify-content-between align-items-center">
            <span className="aq-cartmini-total-title">Subtotal</span>
            <span className="aq-cartmini-total-value">
              Rs. {formatPrice(cartTotalAmount)} INR
            </span>
          </div>
          <div className="aq-cartmini-main-btn d-flex justify-content-between">
            <button
              type="button"
              className="aq-btn-black btn-red-bg text-center w-100"
              onClick={() => handleNavigate("/cart")}
            >
              View Cart
            </button>
            <button
              type="button"
              className={`aq-btn-black text-center border-btn w-100${
                hasItems ? "" : " disable-btn"
              }`}
              disabled={!hasItems}
              onClick={handleNavigateToCheckout}
            >
              Checkout
            </button>
          </div>

          <div className={`aq-cartmini-tools-box note-active${toolPanel === "note" ? " opened" : ""}`}>
            <h4 className="aq-cartmini-tools-text mb-10">
              <span>
                <NoteIcon />
              </span>
              <span>Note</span>
            </h4>
            <div className="aq-cartmini-tools-field mb-10">
              <textarea
                placeholder="Add special instructions for your order..."
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
              />
            </div>
            <div className="aq-cartmini-tools-btn d-flex">
              <button
                type="button"
                className="aq-btn-black btn-cancel border-btn w-100 text-center"
                onClick={closeToolPanel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="aq-btn-black btn-red-bg w-100 text-center"
                onClick={closeToolPanel}
              >
                Save
              </button>
            </div>
          </div>

          <div className={`aq-cartmini-tools-box coupon-active${toolPanel === "coupon" ? " opened" : ""}`}>
            <h4 className="aq-cartmini-tools-text mb-10">
              <span>
                <CouponIcon />
              </span>
              <span>Add A Coupon Code</span>
            </h4>
            <div className="aq-cartmini-tools-field mb-10">
              <label>Enter Code</label>
              <input
                type="text"
                placeholder="Discount code"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
              />
            </div>
            <div className="aq-cartmini-tools-btn d-flex">
              <button
                type="button"
                className="aq-btn-black btn-cancel border-btn w-100 text-center"
                onClick={closeToolPanel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="aq-btn-black btn-red-bg w-100 text-center"
                onClick={closeToolPanel}
              >
                Save
              </button>
            </div>
          </div>

          <div className={`aq-cartmini-tools-box shipping-active${toolPanel === "shipping" ? " opened" : ""}`}>
            <h4 className="aq-cartmini-tools-text mb-10">
              <span>
                <TruckIcon />
              </span>
              <span>Estimate shipping rates</span>
            </h4>
            <div className="aq-cartmini-tools-field mb-10">
              <div className="aq-cartmini-select aq-select mb-10">
                <label>State / County</label>
                <select
                  value={shippingState}
                  onChange={(event) => setShippingState(event.target.value)}
                >
                  <option>Tamil Nadu</option>
                  <option>Kerala</option>
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                </select>
              </div>
              <div className="aq-cartmini-tools-input">
                <label>Postal/Zip Code</label>
                <input
                  type="text"
                  placeholder="600001"
                  value={shippingZip}
                  onChange={(event) => setShippingZip(event.target.value)}
                />
              </div>
            </div>
            <div className="aq-cartmini-tools-btn d-flex">
              <button
                type="button"
                className="aq-btn-black btn-cancel border-btn w-100 text-center"
                onClick={closeToolPanel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="aq-btn-black btn-red-bg w-100 text-center"
                onClick={closeToolPanel}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanelCart;
